const express = require('express');

// import modular routers for /notes and any other future routes (previous notes?)
const notesRouter = require('./notes');

const app = express();

app.use('/notes', notesRouter);

module.exports = app;
