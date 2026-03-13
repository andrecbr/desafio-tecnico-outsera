import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { MovieEntity } from './entities/movie/movie.entity';

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  entities: [MovieEntity],
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
};

export const dataSource = new DataSource(dataSourceOptions);
