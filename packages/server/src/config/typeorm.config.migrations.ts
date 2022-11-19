const typeormConfigMigrations = {
  type: 'postgres' as const,
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'chain123',
  database: 'endobase_dev',
  autoLoadEntities: true,

  //   entities: [
  //     Endo,
  //     Container,
  //     Tray,
  //     Action,
  //     Patient,
  //     Session,
  //     Officer,
  //     Snapshot,
  //     User,
  //     Setting,
  //   ],
  entities: ['src/**/*.entity.ts'],
  //   entities: ['dist/resources/**/*.entity.js'],
  seeds: ['src/db/seeds/**/*.ts'],
  factories: ['src/db/factories/**/*.ts'],
  //   seeds: ['dist/db/seeds/**/*.js'],
  //   factories: ['dist/db/factories/**/*.js'],
  synchronize: true,
  logging: true,
};

export default typeormConfigMigrations;
