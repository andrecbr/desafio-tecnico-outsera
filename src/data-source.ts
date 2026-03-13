import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { MovieEntity } from './entities/movie/movie.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: 'movies.sqlite',
  synchronize: true,
  entities: [MovieEntity],
};

export const seederOptions: SeederOptions = {
  seeds: [`${__dirname}/database/seeds/**/*{.ts,.js}`],
};

export const dataSource = new DataSource(dataSourceOptions);
