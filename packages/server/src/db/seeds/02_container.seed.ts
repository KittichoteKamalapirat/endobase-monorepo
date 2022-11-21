import { Factory, Seeder } from 'typeorm-seeding';
import { Container } from '../../resources/containers/entities/container.entity';

export default class CreateContainers implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(Container)().create({
      col: 'A',
    });
    await factory(Container)().create({
      col: 'B',
    });
    await factory(Container)().create({
      col: 'C',
    });
    // await factory(Container)().create({
    //   col: 'D',
    // });
    // await factory(Container)().create({
    //   col: 'E',
    // });
    // await factory(Container)().create({
    //   col: 'F',
    // });
    // await factory(Container)().create({
    //   col: 'G',
    // });
    // await factory(Container)().create({
    //   col: 'H',
    // });
  }
}
