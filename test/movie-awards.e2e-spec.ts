/* Desabilitando avisos do ESlist para facilitar os testes, não há necessidade nesse escopo */
/* eslint-disable */

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from 'src/app.module';
import { DataSource } from 'typeorm';
import MovieSeeder from 'src/database/seeds/movie.seeder';

describe('Movie Awards (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const dataSource = app.get(DataSource);
    const seeder = new MovieSeeder();
    await seeder.run(dataSource);
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /movies/awards deve retornar o formato esperado', async () => {
    const response = await request(app.getHttpServer() as any)
      .get('/movies/awards')
      .expect(200);

    expect(response.body).toHaveProperty('min');
    expect(response.body).toHaveProperty('max');
    expect(Array.isArray(response.body.min)).toBe(true);
    expect(Array.isArray(response.body.max)).toBe(true);
  });

  it('GET /movies/awards deve retornar o produtor com menor intervalo entre prêmios consecutivos', async () => {
    const response = await request(app.getHttpServer() as any)
      .get('/movies/awards')
      .expect(200);

    const { min } = response.body;

    expect(min.length).toBeGreaterThan(0);
    min.forEach((entry: any) => {
      expect(entry).toHaveProperty('producer');
      expect(entry).toHaveProperty('interval');
      expect(entry).toHaveProperty('previousWin');
      expect(entry).toHaveProperty('followingWin');
      expect(entry.followingWin - entry.previousWin).toBe(entry.interval);
    });

    expect(min).toContainEqual({
      producer: 'Joel Silver',
      interval: 1,
      previousWin: 1990,
      followingWin: 1991,
    });
  });

  it('GET /movies/awards deve retornar o produtor com maior intervalo entre prêmios consecutivos', async () => {
    const response = await request(app.getHttpServer() as any)
      .get('/movies/awards')
      .expect(200);

    const { max } = response.body;

    expect(max.length).toBeGreaterThan(0);
    max.forEach((entry: any) => {
      expect(entry).toHaveProperty('producer');
      expect(entry).toHaveProperty('interval');
      expect(entry).toHaveProperty('previousWin');
      expect(entry).toHaveProperty('followingWin');
      expect(entry.followingWin - entry.previousWin).toBe(entry.interval);
    });

    expect(max).toContainEqual({
      producer: 'Matthew Vaughn',
      interval: 13,
      previousWin: 2002,
      followingWin: 2015,
    });
  });
});
