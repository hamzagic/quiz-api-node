const Quiz = require('../models/Quiz');
const { createService, listByUserIdService, deleteService } = require('../services/QuizService');

const create = async (req, res) => {
    const {name, creator, totalQuestions, questions} = req.body;
    try {
        await createService({name, creator, totalQuestions, questions});
        res.status(201).json({message: 'quiz created successfully', data: quiz})
    } catch(e) {
        res.status(401).json({error: e.message})
    }
}

const listById = async (req, res) => {
    const id = req.params.id;
    const result = await listByUserIdService(id);
    res.json({data: result})
};

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

module.exports = { create, listById, update, deleteQuiz };