## Descrição

Desafio de avaliação Back-end Outsera.

O teste foi realizado utilizando o framework NestJS com Fastify inicializado com seu scaffolding padrão.
Foi utilizado o padrão de *seeders* para realizar a conversão e importação para o banco de dados dos filmes listados no CSV.
O banco de dados utilizado foi o SQLite (SGBDR)


## Clonando o repositório

```bash
$ git clone https://github.com/andrecbr/desafio-tecnico-outsera.git
```

## Instalação

```bash
$ cd desafio-tecnico-outsera
$ pnpm install
```

## Compilar e rodar o projeto

```bash
# desenvolvimento
$ pnpm run start

# desenvolvimento (watch mode)
$ pnpm run start:dev

# produção
$ pnpm run start:prod
```

## Executar os testes (e2e)

```bash
# e2e tests
$ pnpm run test:e2e
```

## Endpoints

Através de aplicativos como Postman ou Insomnia é possível executar as chamadas dos endpoints (CRUD)

| Método | Endpoint         | Descrição                                 |
|--------|------------------|-------------------------------------------|
| GET    | /movies          | Lista completa dos filmes                 |
| GET    | /movies/:id      | Retorna um filme específico através do id |
| GET    | /movies/awards   | Endpoint principal do desafio retorna produtor de maior intervalo entre dois prêmios consecutivos e dois prêmios mais rápidos |
| POST   | /movies          | Cria um filme manualmente                 |
| PUT    | /movies/:id      | Atualiza um filme específico              |
| DELETE | /movies/:id      | Deleta um filme específico                |

## TODO

- Autenticação e guarda de rotas
- Validar parametros de entrada dos endpoints
- Implementar Swagger
- Criação de .env (Dotenv) para evitar hardcoding