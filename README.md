# Money tracker

Visualise your personal finances.

![screenshot of app](./docs/screenshot.png)

## Prerequisites

- Docker
- Docker compose
- Node.js 14

## Quick start

Ensure docker is running. Then:

```sh
$ npm run api:up     # starts Postgres and Hasura instances
$ npm run api:dev    # starts API server
$ npm run client:dev # starts UI server
```

To update the API:

```sh
$ npm run api:console
```

Make modifications using the web UI.

To query the database directly:

```sh
$ npm run db
```

To update graphql typings:

```sh
$ npm run generate
```
