import {
  BLACK_COLOR_COMMAND,
  BLUE_COLOR_COMMAND,
  GREEN_COLOR_COMMAND,
  RED_COLOR_COMMAND,
  YELLOW_COLOR_COMMAND,
} from '../constants';
import {
  ENDO_STATUS,
  ENDO_STATUS_OBJ,
} from '../resources/endos/entities/endo.entity';
import { RowType } from '../resources/trays/entities/tray.entity';
import { rowNumToLEDPosition } from './rowNumToLEDPosition';

interface Args {
  endoStatus: ENDO_STATUS;
  row: RowType;
}
export const writeColorCommand = ({ endoStatus, row }: Args) => {
  const colorCommand = (() => {
    switch (endoStatus) {
      case ENDO_STATUS_OBJ.READY:
        return GREEN_COLOR_COMMAND;

      case ENDO_STATUS_OBJ.EXPIRED:
        return RED_COLOR_COMMAND;

      case ENDO_STATUS_OBJ.EXPIRE_SOON:
        return YELLOW_COLOR_COMMAND;

      case ENDO_STATUS_OBJ.DRYING:
        return BLUE_COLOR_COMMAND;

      default:
        return BLACK_COLOR_COMMAND;
    }
  })();

  const ledPosition = rowNumToLEDPosition(row);

  const command = `:L${ledPosition}(${colorCommand})\r\n)`;

  return command;
};
