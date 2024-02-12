const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const { Schema } = mongoose;  

const quizSchema = new Schema({
    id: ObjectId,
    creator: {
        type: ObjectId,
        ref: 'user'
    },
    quizName:{
        type: String,
        required: true,
    },
    questions: [
        {
            questionText: {
                type: String,
                required: true,
            },
            order: {type: Number, required: true},
            answers: [
                {
                    answerText: {type: String, required: true},
                    isCorrect: {type: String, required: true},
                }
            ]
        }
    ],
    numberOfQuestions: {type: Number, required: true},
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;