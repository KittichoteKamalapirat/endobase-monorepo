import { CONTAINER_TYPE_OBJ, CONTAINER_TYPE_VALUES } from 'src/types/CONTAINER_TYPE';
import { Factory, Seeder } from 'typeorm-seeding';
import { Container } from '../../resources/containers/entities/container.entity';

export default class CreateContainers implements Seeder {
  public async run(factory: Factory): Promise<any> {

    await Promise.all(Object.keys(CONTAINER_TYPE_OBJ).map(async (key) => {
      await factory(Container)().create({
        col: key as CONTAINER_TYPE_VALUES,
      });
    }));


    // await factory(Container)().create({
    //   col: 'a',
    // });
    // await factory(Container)().create({
    //   col: 'b',
    // });
    // await factory(Container)().create({
    //   col: 'c',
    // });
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
