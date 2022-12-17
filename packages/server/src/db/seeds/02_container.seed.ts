import { Factory, Seeder } from 'typeorm-seeding';
import { Container } from '../../resources/containers/entities/container.entity';

export default class CreateContainers implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(Container)().create({
      col: 'a',
    });
    await factory(Container)().create({
      col: 'b',
    });
    await factory(Container)().create({
      col: 'c',
    });
    // await factory(Container)().create({
    //   col: 'd',
    // });
    // await factory(Container)().create({
    //   col: 'e',
    // });
    // await factory(Container)().create({
    //   col: 'f',
    // });
    // await factory(Container)().create({
    //   col: 'g',
    // });
    // await factory(Container)().create({
    //   col: 'h',
    // });
  }
}
