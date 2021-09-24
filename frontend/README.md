[![Netlify Status](https://api.netlify.com/api/v1/badges/77f94183-2907-427a-964f-f47486b4b166/deploy-status)](https://app.netlify.com/sites/cs3216-timeline/deploys)

# CS3216 Timeline - Frontend

This is the frontend repository for CS3216 Assignment 3.

## How to setup together with backend

In the `server.js` file in `src/utils`, changed `baseURL` to `http://localhost:5000`.

Setup the backend by creating the database locally. Change everything in `db.js` to local config, example shown below. Make sure you create the tables too.

```
const Pool = require('pg').Pool;

const pool = new Pool({
  user: "postgres",
  password: "qwerty",
  host: "localhost",
  port: 5432,
  database: "timeline",
});
module.exports = pool;
```

In the frontend, run `npm run start`.

In the backend, run `nodemon app.js`

To checkout what routes exist in the frontend, go to the `app.jsx` file in `src` folder.
