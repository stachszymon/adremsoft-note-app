const Note = require('../models/note.model');
const createError = require('http-errors');

const getAllNotes = async (req, res, next) => {
    try {
        const notes = await Note.find();
        return res.status(200).json(notes);
    }catch(err){
        next(createError(500, err));
    }
};

const getNote = (req, res, next) => {
    next();
};

const createNote = async (req, res, next) => {
    try {
        Note.create({
            title: req.body.title,
            subject: req.body.subject,
            content: req.body.content,
            category: req.body.category,
        }, (err, note) => {
            if (err) {
                next(createError(500, err))
            } else {
                return res.status(201).json(note);
            }
        });
    } catch(err) {
        next(createError(500, err));
    }
};

const updateNote = async (req, res, next) => {
    try {
        await req.note.update({
            title: req.body.title,
            subject: req.body.title,
            content: req.body.content,
            category: req.body.category
        });
        return res.status(204).json('success');
    } catch (err) {
        next(createError(500, err));
    }
};

const deleteNote = async (req, res, next) => {
    try {
        await req.note.delete();
        return res.status(204).json('success');
    } catch(err) {
        next(createError(500, err));
    }
};

module.exports = {
    getAllNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote
};