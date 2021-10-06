# Snappy - E2EE Implementation

Snappy is a very simple E2EE implementation example as a final project for CNIT370.

## About
Snappy is made of two projects, an API server and an electron desktop app. An SQL server is used to store all data. For more implementation details, visit [this document](.docs/Overview.md).

## Requirements
Make sure to have the following
- Node
- NPM/Yarn
- Docker

Recommended:
- VSCode

## Development
To run the server, perform the following commands:
```
docker-compose up
```

To run the desktop client, perform the following commands:
```
cd src/Snappy.Desktop
yarn
yarn start
```

## Building

WIP

## Contributors

Marcus Orciuch - Frontend 
Jacob Bennette - Backend
WIP

## Attributions
For the frontend, [this guide](https://ankitbko.github.io/blog/2019/08/electron-forge-with-react-and-typescript/) was used to set up the project.