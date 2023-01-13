import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Container } from '../../resources/containers/entities/container.entity';
import { RowType, Tray } from '../../resources/trays/entities/tray.entity';

export default class CreateTrays implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const containers = await connection
      .createQueryBuilder()
      .select('container')
      .from(Container, 'container')
      .getMany();

    // create 16 trays (1-8) for each container
    await Promise.all(
      containers.map(async (container) => {
        const rows = Array.from({ length: 8 }, (_, i) => i + 1) as RowType[];
        await Promise.all(
          rows.map(async (row) => {
            await factory(Tray)().create({
              containerId: container.id,
              row,
            });
          }),
        );
      }),
    );
  }
}
