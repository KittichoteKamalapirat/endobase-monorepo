/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

import { Factory, Seeder } from 'typeorm-seeding';
import { User } from '../../resources/users/entities/user.entity';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(User)().create({
      username: '02321',
      password: '$2b$10$sLE1vuo0vs6xy2oqxV/jNOjSyF83/S.PaG9dGgX5Q3lyus2/VXzqe',
    });
    // await factory(User)().create(); // in case want to create random one from factory
  }
}
