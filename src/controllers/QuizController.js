const Quiz = require('../models/Quiz');
const { createService, listByUserIdService, deleteService, getQuizDetails } = require('../services/QuizService');
const { validationResult } = require('express-validator');

const create = async (req, res) => {
    const {name, creator, totalQuestions, questions} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() });
    }

    // questions.forEach(question => {
    //     if(!question.questionText ||!question.order ||!question.answers) {
    //         console.log("first one");
    //         validationErrors.push('questionText, order, answers are required');
    //         return; 
    //     }
    //     question.answers.forEach(answer => {
    //         if(!answer.answerText || answer.isCorrect == undefined) {
    //             console.log("second");
    //             validationErrors.push('answerText and isCorrect are required');
    //             return;
    //         }
    //     });
    // });
    try {
        const quiz = await createService({name, creator, totalQuestions, questions});
        if(quiz.error) {
            console.log("try called");
            res.status(200).json({error: quiz.error})
        } else {
            res.status(201).json({message: 'quiz created successfully', data: quiz})
        }
    } catch(e) {
        console.log("catch called");
        res.status(401).json({error: e.message})
    }
}

const listByUserId = async (req, res) => {
    const id = req.params.id;
    const result = await listByUserIdService(id);
    res.json({data: result})
};

const getDetails = async (req, res) => {
    const id = req.params.id;
    const token = req.headers.token;
    console.log(id);
    const result = await getQuizDetails(id, token);
    res.json({data: result});
}

// todo: only a quiz that has not been shared can be updated
const update = async (req, res, next) => {
    const {name, creator, totalQuestions, questions} = req.body;

    try {
        const quiz = Quiz.findById(id);
        quiz.quizName = name;
        quiz.creator = creator;
        quiz.numberOfQuestions = totalQuestions;
        quiz.questions = questions
        await quiz.save();
        res.status(201).json({message: 'quiz updated successfully', data: quiz})
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

const deleteQuiz = async (req, res) => {
    const id = req.params.id;
    const result = await deleteService(id);
    res.json({data: result});
}

module.exports = { create, listByUserId, update, deleteQuiz, getDetails };