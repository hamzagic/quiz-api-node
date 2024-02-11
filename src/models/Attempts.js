const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const attemptSchema = new Schema({
  id: ObjectId,
  quiz: ObjectId("quiz"),
  user: ObjectId("user"),
  dateTimeStarted: { type: Date, default: Date.now }, 
  dateTimeCompleted: { type: Date },
  answers: [
    {
      question: ObjectId("question"),
      answer: { type: String, required: true },
      isCorrect: { type: Boolean },
    }
  ],
});

const Attempt = mongoose.model('Attempt', attemptSchema);
module.exports = { Attempt };