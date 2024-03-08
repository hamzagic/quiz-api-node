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
            answers: [ {type: String, required: true} ],
            correctAnswerIndex: {type: Number, required: true}
        }
    ],
    numberOfQuestions: {type: Number, required: true},
    created: { type: Date },
    sharedLink: { type: String }
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;