const mongoose = require('mongoose');

const { Schema } = mongoose;  

const questionSchema = new Schema({
    title: String,
    correct_answer: {title: String},
    // answers_ids: [mongoose.SchemaTypes.ObjectId],
    answers: [{title: String}],
    total_answers: Number
});

module.exports = mongoose.model('Question', questionSchema);
