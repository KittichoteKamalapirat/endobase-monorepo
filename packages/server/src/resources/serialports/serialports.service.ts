import { Inject, Injectable } from '@nestjs/common';
import { ReadlineParser, SerialPort } from 'serialport';
import { SERIALPORTS_PROVIDER } from '../../constants';
import { formatSTS } from '../../utils/formatSTS';
import { numTo3Digits } from '../../utils/numTo3Digits';
import { writeColorCommand } from '../../utils/writeColorCommand';
import { ContainersService } from '../containers/containers.service';
import { ColType } from '../containers/entities/container.entity';
import { ENDO_STATUS } from '../endos/entities/endo.entity';
import { CreateSnapshotInput } from '../snapshots/dto/create-snapshot.input';
import { SnapshotsService } from '../snapshots/snapshots.service';
import { RowType } from '../trays/entities/tray.entity';

@Injectable()
export class SerialportsService {
  constructor(
    private snapshotsService: SnapshotsService,
    @Inject(SERIALPORTS_PROVIDER)
    private serialports: { A: SerialPort; B: SerialPort; C: SerialPort },
    private snapshotService: SnapshotsService,
    private containersService: ContainersService,
  ) {
    const parserA = this.serialports.A.pipe(
      new ReadlineParser({ delimiter: '\r\n' }),
    );
    const parserB = this.serialports.B.pipe(
      new ReadlineParser({ delimiter: '\r\n' }),
    );
    const parserC = this.serialports.C.pipe(
      new ReadlineParser({ delimiter: '\r\n' }),
    );

    const parsers = [parserA, parserB, parserC];

    // event listener on controller return
    parsers.forEach((parser, index) => {
      parser.on('data', async (data: string) => {
        if (data.includes('sts')) {
          // only save snapshot if it is reading system status
          const col = String.fromCharCode(index + 65) as ColType; // 65 = A
          const container = await this.containersService.findOneByContainerChar(
            col,
          );

          const { systemStatus, temp, hum } = formatSTS(data);
          const input: CreateSnapshotInput = {
            systemStatus,
            temp,
            hum,
            containerId: container.id,
          };
          console.log('input', input);
          snapshotService.create(input);
        }
      });
    });
  }

  writeRandomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);

    const threeDigitR = numTo3Digits(r);
    const threeDigitG = numTo3Digits(g);
    const threeDigitB = numTo3Digits(b);
    const randomColor = `${threeDigitR},${threeDigitG},${threeDigitB}`;

    const command = `:L00(${randomColor})\r\n)`;
  }

  writeColor({
    col,
    row,
    endoStatus,
  }: {
    col: ColType;
    row: RowType;
    endoStatus: ENDO_STATUS;
  }) {
    const command = writeColorCommand({
      endoStatus,
      row,
    });

    this.serialports[col].write(command, (err) => {
      // if (error) console.log(error?.message);
      if (err) {
        return console.log('Error on write: ', err.message);
      }
      console.log('wrote');
    });
  }
}
