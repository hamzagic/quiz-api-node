const mongoose = require('mongoose');

const { Schema } = mongoose;  

const questionSchema = new Schema({
    title: String,
    correct_answer: String,
    // answers_ids: [mongoose.SchemaTypes.ObjectId],
    answers: [String],
    total_answers: Number,
    quiz_id: mongoose.SchemaTypes.ObjectId
});

module.exports = mongoose.model('Question', questionSchema);
