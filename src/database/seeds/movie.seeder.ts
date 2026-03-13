import { readFileSync } from 'fs';
import { MovieEntity } from 'src/entities/movie/movie.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import Papa from 'papaparse';

export default class MovieSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(MovieEntity);
    const count = await repository.count();
    if (count > 0) return;
    const movies = this.parseMoviesCSV();
    await repository.insert(movies);
  }

  private parseMoviesCSV(): Partial<MovieEntity>[] {
    const stream = readFileSync('src/assets/Movielist.csv', 'utf-8');

    const result = Papa.parse(stream, {
      header: true,
      delimiter: ';',
      skipEmptyLines: true,
      transform: (value, header) => {
        if (header == 'winner') {
          return value === 'yes';
        }
        return value;
      },
    });

    return result.data as Partial<MovieEntity>[];
  }
}
