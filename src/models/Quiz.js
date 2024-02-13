const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { Schema } = mongoose; 

const quizSchema = new Schema({
    id: ObjectId,
    creator: {
        type: ObjectId,
        ref: 'user'
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isShared: {
        type: Boolean,
        default: false,
    },
    quizName:{
        type: String,
        required: true,
    },
    quizImage: {type: String},
    questions: [
        {
            questionText: {
                type: String,
                required: true,
            },
            questionImage: {type: String},
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
    created: { type: Date },
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;