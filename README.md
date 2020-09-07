## Description

Another task management app

## Prerequisites

Yarn, Docker, Docker-Compose

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# run postgress in docker container
$ docker-compose up -d

# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Stop docker container

```bash
# to stop docker container run
$ docker-compose stop
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Documentation

After starting app, documentation is available at http://localhost:3000/api/
