# Stable Software Server

This is the backend server side of Stable Software using Node JS and Postgresql.

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Installing

Buvie requires Node.js v6.0+ to run.
Install the dependencies and devDependencies and start the server.

```
npm install
```

## Running the tests

To run back-end tests, run `npm test` in the terminal.

## API Endpoint Overview

### POST `/api/horses`

```js
// req.body
{
  id: Integer,
  name: String,
  age: Integer,
  stall: Integer,
  riderId: Integer
}
```

### POST `/api/riders`

```js
// req.body
{
  id: Integer,
  name: String,
}


```

### PATCH `/api/horses`

```js
// req.body
{
  id: Integer,
  name: String,
  age: Integer,
  stall: Integer,
  riderId: Integer
}
```

### GET `/api/horses/id`

```js
// req.body
{
  horseId: Integer,
}
```

### GET `/api/riders/id`

```js
// req.body
{
  riderId: Integer,
}
```
