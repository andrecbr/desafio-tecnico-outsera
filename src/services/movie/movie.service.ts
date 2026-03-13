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
}
