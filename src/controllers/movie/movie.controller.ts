import { Controller, Get } from '@nestjs/common';
import { MovieService } from '../../services/movie/movie.service';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  getMovies(): string {
    return this.movieService.getMovies();
  }

  @Get(':id')
  getMovie(): string {
    return this.movieService.getMovie();
  }
}
