import { getManager } from 'typeorm';
import { Seeder } from 'typeorm-seeding';

export default class DropDatabase implements Seeder {
  public async run(): Promise<any> {
    // // independent
    // await getManager().query('DROP TABLE setting');
    // // depend on others
    // await getManager().query('DROP TABLE action');
    // // others depend on
    // await getManager().query('DROP TABLE if exists endo cascade'); // this will drop any foreign key that is referencing the endo table
    // await getManager().query('DROP TABLE if exists officer cascade');
    // await getManager().query('DROP TABLE if exists patient cascade');
    // await getManager().query('DROP TABLE if exists session cascade');
    // await getManager().query('DROP TABLE if exists container cascade');
    // await getManager().query('DROP TABLE if exists tray cascade');
    // await getManager().query('DROP TABLE if exists "user" cascade');
    // await getManager().query('SET FOREIGN_KEY_CHECKS = 0');
    // await getManager().query('TRUNCATE setting');
    // await getManager().query('TRUNCATE endo RESTART IDENTITY CASCADE');
    // await getManager().query('SET FOREIGN_KEY_CHECKS = 1');
  }
}
