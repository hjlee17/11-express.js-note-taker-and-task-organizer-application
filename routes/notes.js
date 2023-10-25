const notes = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

notes.post('/', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title, 
            text,
            // possibly add a unique id to note? will need uuid helper function
        };

        readAndAppend(newNote, '/db/db.json')

        const response = {
            status: 'success',
            body: newNote,
        }

        res.json(response);

    } else {
        res.json('error in saving note');
    }
})
module.exports = notes;