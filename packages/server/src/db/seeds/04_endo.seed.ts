import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Endo } from '../../resources/endos/entities/endo.entity';
import { Tray } from '../../resources/trays/entities/tray.entity';
import { v4 as uuidv4 } from 'uuid';

export default class CreateTrays implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const trays = await connection
      .createQueryBuilder()
      .select('tray')
      .from(Tray, 'tray')
      .getMany();

    // create 16 trays (1-16) for each container
    await Promise.all(
      trays.map(async (tray) => {
        await factory(Endo)().create({
          brand: 'Olympus',
          serialNum: uuidv4(),
          model: '1',
          type: 'Gastro',
          trayId: tray.id,
        });
      }),
    );
  }
}
