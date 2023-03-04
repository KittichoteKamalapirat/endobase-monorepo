import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { v4 as uuidv4 } from 'uuid';
import { Endo } from '../../resources/endos/entities/endo.entity';
import { Tray } from '../../resources/trays/entities/tray.entity';

export default class CreateTrays implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const trays = await connection
      .createQueryBuilder()
      .select('tray')
      .from(Tray, 'tray')
      .getMany();

    const brands = ['Olympus', 'Fujifilm', 'PENTAX', 'Stryker'];
    const brandRandomIndex = Math.floor(Math.random() * brands.length);
    const brand = brands[brandRandomIndex];

    const types = ['Broncho', 'Gastro', 'Colono', 'ERCP'];
    const typeRandomIndex = Math.floor(Math.random() * types.length);
    const type = types[typeRandomIndex];

    // create 16 trays (1-16) for each container
    await Promise.all(
      trays.map(async (tray) => {
        await factory(Endo)().create({
          brand,
          serialNum: uuidv4().slice(10),
          model: '1',
          type,
          trayId: tray.id,
        });
      }),
    );
  }
}
