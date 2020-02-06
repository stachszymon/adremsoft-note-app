const
    mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: String,
    subject: String,
    content: String,
    category: {
        type: String,
        enum: ['normal', 'important', 'disabled']
    }
}, {
    timestamp: true,
});

module.exports = mongoose.model('Note', noteSchema);