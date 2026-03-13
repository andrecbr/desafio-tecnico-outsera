import { Module } from '@nestjs/common';
import { AppController } from './controllers/app/app.controller';
import { MovieModule } from './modules/movie/movie.module';
import { MovieEntity } from './entities/movie/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    MovieModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      entities: [MovieEntity],
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
