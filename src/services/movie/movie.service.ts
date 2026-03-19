import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieEntity } from 'src/entities/movie/movie.entity';
import { CreateMovieDto } from 'src/dtos/movie/create-movie.dto';
import { UpdateMovieDto } from 'src/dtos/movie/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private movieRepository: Repository<MovieEntity>,
  ) {}

  getMovie(id: number) {
    return this.movieRepository.findOneBy({ id: id });
  }

  getMovies() {
    return this.movieRepository.find();
  }

  create(createMovieDto: CreateMovieDto) {
    return this.movieRepository.save(createMovieDto);
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return this.movieRepository.update(id, updateMovieDto);
  }

  delete(id: number) {
    return this.movieRepository.delete({ id: id });
  }

  private winnersProducersByYear(
    winners: {
      producers: string;
      year: number;
    }[],
  ): Record<string, number[]> {
    return winners.reduce(
      (acc, currentValue) => {
        const producers = currentValue.producers.split(/, | and /);

        producers.forEach((producer) => {
          if (!acc[producer]) {
            acc[producer] = [];
          }
          acc[producer].push(currentValue.year);
        });

        return acc;
      },
      {} as Record<string, number[]>,
    );
  }

  private calcIntervals(producersWinners: Record<string, number[]>) {
    const intervals: {
      producer: string;
      interval: number;
      previousWin: number;
      followingWin: number;
    }[] = [];

    const producersWinnersArr = Object.entries(producersWinners);

    producersWinnersArr.forEach(([produtor, year]) => {
      year.sort((a, b) => {
        return a - b;
      });

      year.reduce((acumulador, item) => {
        intervals.push({
          producer: produtor,
          interval: item - acumulador,
          previousWin: acumulador,
          followingWin: item,
        });
        return item;
      });
    });

    const min = Math.min(...intervals.map((i) => i.interval));
    const max = Math.max(...intervals.map((i) => i.interval));
    const result = {
      min: intervals.filter((i) => i.interval === min),
      max: intervals.filter((i) => i.interval === max),
    };
    return result;
  }

  async getAwards() {
    const winners = await this.movieRepository.findBy({ winner: true });

    const producersWinners = this.winnersProducersByYear(winners);

    return this.calcIntervals(producersWinners);
  }
}
