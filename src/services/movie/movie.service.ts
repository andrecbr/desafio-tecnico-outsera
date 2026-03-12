import { Injectable } from '@nestjs/common';

@Injectable()
export class MovieService {
  getMovie(): string {
    return 'oi';
  }

  getMovies(): string {
    return 'Movies movies Movies!';
  }
}
