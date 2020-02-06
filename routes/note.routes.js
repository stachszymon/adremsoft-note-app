const Note = require('../models/note.model');
const createError = require('http-errors');
const router = require('express').Router();
const {
    getAllNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote
} = require("../controllers/note.controller");

router.param('note', async (req, res, next, note) => {
    try{
        req.note = await Note.findById(note);
        next();
    }catch(err){
        next(createError(500, err))
    }
});

router.get('/', getAllNotes);
router.post('/', createNote);
router.patch('/:note', updateNote);
router.delete('/:note', deleteNote);

module.exports = router;