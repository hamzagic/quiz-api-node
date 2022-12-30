const mongoose = require('mongoose');

const { Schema } = mongoose;  

const quizSchema = new Schema({
    title: String,
    total_questions: Number,
    questions: [{title: String, correct_answer: String, answers: [String], total_answers: Number}],
    result_id: mongoose.SchemaTypes.ObjectId
});

module.exports = mongoose.model('Quiz', quizSchema);