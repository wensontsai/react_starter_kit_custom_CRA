# Slicerhawk

React/Redux client for use with cloud-based cl_sliceconfig that can be found here: _not-yet-available url_

## Usage

Install [nodemon](https://github.com/remy/nodemon) globally

```
npm i nodemon -g
```

Install server and client dependencies

```
yarn
cd client
yarn
```

To start the server and client at the same time (from the root of the project)

```
yarn dev
```

To start only the client:

```
cd client
npm start
```
That will pop up a browser window pointed to `http://localhost:3000` with hot module reloading on js and css changes.

## How this works

This repo has capability for both client and server API layer.  

Client/React code lives in `/client`, while node/express code lives in parent level: `/models, sequelize.js and server.js`

Project uses a **proxy**. We have a _proxy_ entry in `client/package.json`

```
"proxy": "http://localhost:5000/"
```

This tells Webpack development server to proxy our API requests to our API server, given that our Express server is running on **localhost:5000**
