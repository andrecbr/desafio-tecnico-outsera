import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MovieService } from '../../services/movie/movie.service';
import { CreateMovieDto } from 'src/dtos/movie/create-movie.dto';

@Controller('movies')
export class MovieController {
  // Create Read Update Delete
  constructor(private readonly movieService: MovieService) {}

  @Post()
  createMovie(@Body() createMovie: CreateMovieDto) {
    return this.movieService.create(createMovie);
  }

  @Get()
  getMovies(): string {
    return this.movieService.getMovies();
  }

  @Get(':id')
  getMovie(@Query() id: number) {
    return this.movieService.getMovie(id);
  }
}
