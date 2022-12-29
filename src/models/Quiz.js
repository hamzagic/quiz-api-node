const mongoose = require('mongoose');

const { Schema } = mongoose;  

const quizSchema = new Schema({
    title: { type: String },
    total_questions: {
        type: Number
    },
    questions: [{question_id: Number}],
    result_id: {
        type: Number
    }
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = { Quiz };