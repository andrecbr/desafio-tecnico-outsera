## Descrição

Desafio de avaliação Back-end Outsera.

O teste foi realizado utilizando o framework NestJS com Fastify inicializado com seu scaffolding padrão.
Foi utilizado o padrão de *seeders* para realizar a conversão e importação para o banco de dados dos filmes listados no CSV.
O banco de dados utilizado foi o SQLite (SGBDR)


## Baixando os arquivos

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

Através de aplicativos como Postman ou Imnsonia é possível executar as chamadas dos endpoints (CRUD)

```makefile
# retorna a lista completa de filmes
$ GET /movies http://localhost:3000/movies

# retorna um filme específico através do id
$ GET /movies/:id http://localhost:3000/movies/1

# retorna produtor de maior intervalo entre dois prêmios consecutivos e dois prêmios mais rápidos
$ GET /movies/awards http://localhost:3000/movies/awards # endpoint principal do desafio

# cria um filme manualmente
# {
#    "title": "Teste",
#    "year": 2023,
#    "studios": "Studio SA",
#    "producers": "ProductionCompany SA",
#    "winner": "Yes"
# }
$ POST /movies http://localhost:3000/movies

# atualiza um filme específico manualmente através do id
$ PUT /movies/:id http://localhost:3000/movies/1

# apaga um filme específico pelo id
$ DELETE /movies/:id http://localhost:3000/movies/1
```

## TODO

- Autenticação e guarda de rotas
- Validar parametros de entrada dos endpoints
- Implementar Swagger
- Criação de .env (Dotenv) para evitar hardcoding