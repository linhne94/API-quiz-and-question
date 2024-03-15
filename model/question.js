const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    keywords: {
        type: [String],
        required: false
    },
    correctAnswerIndex: {
        type: Number,
        required: true
    }
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question