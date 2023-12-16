import { DataSource } from 'typeorm';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

// DataSourceOptions
export const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities: ['dist/**/*.entity.js'],
  // synchronize: true,
  migrations: ['dist/database/migrations/*.js'],
  // migrationsRun: true,
  logging: true,
};

const dataSource = new DataSource(config);
export default dataSource;
