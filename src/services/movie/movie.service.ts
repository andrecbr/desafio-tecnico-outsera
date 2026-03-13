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
      (acumulador, valorAtual) => {
        //console.log('Acumulador:', acumulador);
        //console.log('ValorAtual:', valorAtual);

        const produtoresLinha = valorAtual.producers.split(/, | and /);

        produtoresLinha.forEach((produtor) => {
          if (!acumulador[produtor]) {
            acumulador[produtor] = [];
          }
          acumulador[produtor].push(valorAtual.year);
        });

        return acumulador;
      },
      {} as Record<string, number[]>,
    );
  }

  private calcIntervals(producersWinners: Record<string, number[]>) {
    const intervalo: {
      producer: string;
      interval: number;
      previousWin: number;
      followingWin: number;
    }[] = [];

    const producersWinnersArr = Object.entries(producersWinners);

    producersWinnersArr.forEach(([produtor, ano]) => {
      ano.sort((a, b) => {
        return a - b;
      });

      ano.reduce((acumulador, item) => {
        intervalo.push({
          producer: produtor,
          interval: item - acumulador,
          previousWin: acumulador,
          followingWin: item,
        });
        return acumulador;
      });
    });

    const min = Math.min(...intervalo.map((i) => i.interval));
    const max = Math.max(...intervalo.map((i) => i.interval));
    const result = {
      min: intervalo.filter((i) => i.interval === min),
      max: intervalo.filter((i) => i.interval === max),
    };
    return result;
  }

  async getAwards() {
    const winners = await this.movieRepository.findBy({ winner: true });

    const producersWinners = this.winnersProducersByYear(winners);

    return this.calcIntervals(producersWinners);
  }
}
