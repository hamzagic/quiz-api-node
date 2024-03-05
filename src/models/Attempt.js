const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const attemptSchema = new Schema({
  id: ObjectId,
  quizToken: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String },
  dateSent: { type: Date, default: Date.now }, 
  answers: [],
  differences: {},
  quiz: {}
});

const Attempt = mongoose.model('Attempt', attemptSchema);
module.exports = Attempt;