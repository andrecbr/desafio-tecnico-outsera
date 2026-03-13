import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieEntity } from 'src/entities/movie/movie.entity';
import { CreateMovieDto } from 'src/dtos/movie/create-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private movieRepository: Repository<MovieEntity>,
  ) {}

  getMovie(id: number) {
    return this.movieRepository.findOneBy({ id: id });
  }

  getMovies(): string {
    return 'Movies movies Movies!';
  }

  create(createMovieDto: CreateMovieDto) {
    //TODO: parei aqui
    return createMovieDto;
  }
}
