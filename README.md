# Money tracker

Visualise your personal finances.

![screenshot of app](./docs/screenshot.png)

## Prerequisites

- Docker
- Docker compose
- Postgres
- Node.js

## Quick start

Make sure Postgres and Docker are running. Then:

```sh
$ npm run api:up
$ npm start
```

Migrate an existing Homebank xhb file:

```sh
$ npm run bootstrap:xml-to-json
$ npm run bootstrap:json-to-postgres
```

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
