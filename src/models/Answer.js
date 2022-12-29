const mongoose = require('mongoose');

const { Schema } = mongoose;  

const answerSchema = new Schema({
    title: String,
});

module.exports = mongoose.model('Answer', answerSchema);
