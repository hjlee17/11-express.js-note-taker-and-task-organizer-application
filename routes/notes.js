const notes = require('express').Router();
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

// /api/notes

// GET route to retrieve all notes
notes.get('/', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
)

// POST route to create and add new notes
notes.post('/', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title, 
            text,
            // add a unique id to note
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json')

        const response = {
            status: 'success',
            body: newNote,
        }

        res.json(response);

    } else {
        res.json('error in saving note');
    }
})


// DELETE route for a specific note
notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')

      .then((data) => JSON.parse(data))
    
      .then((json) => {

        // make a new array of all tips except the one with the ID provided in the URL
        const result = json.filter((note) => note.id !== noteId);
  
        // save that array to the filesystem
        writeToFile('./db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${noteId} has been deleted 🗑️`);
    });
});


module.exports = notes;