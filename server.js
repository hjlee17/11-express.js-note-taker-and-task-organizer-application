const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// GET route for index.html page (`GET *` returns the `index.html` file)
// GET route for notes page (`GET /notes` returns the `notes.html` file)

app.listen(PORT, () =>
  console.log(`app listening at http://localhost:${PORT}`)
);