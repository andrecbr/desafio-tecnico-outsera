import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MovieService } from '../../services/movie/movie.service';
import { CreateMovieDto } from 'src/dtos/movie/create-movie.dto';
import { MovieEntity } from 'src/entities/movie/movie.entity';
import { UpdateMovieDto } from 'src/dtos/movie/update-movie.dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  createMovie(@Body() createMovie: CreateMovieDto) {
    return this.movieService.create(createMovie);
  }

  @Get()
  getMovies(): Promise<MovieEntity[]> {
    return this.movieService.getMovies();
  }

  @Get(':id')
  getMovie(@Query() id: number) {
    return this.movieService.getMovie(id);
  }

  @Put(':id')
  updateMovie(@Param('id') id: number, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(id, updateMovieDto);
  }

  @Delete(':id')
  deleteMovie(@Param('id') id: number) {
    return this.movieService.delete(id);
  }

  @Get('awards')
  getMoviesList() {
    return this.movieService.getAwards();
  }
}
