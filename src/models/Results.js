const mongoose = require('mongoose');

const { Schema } = mongoose;  

const resultSchema = new Schema({
    title: String,
});

module.exports = mongoose.model('Result', resultSchema);
