const Quiz = require('../models/Quiz');

const create = async (req, res) => {
    const {name, creator, totalQuestions, questions} = req.body;
    try {
        const quiz = new Quiz(
            {
                quizName: name,
                creator: creator,
                numberOfQuestions: totalQuestions,
                questions: questions,
            }
        );
        await quiz.save();
        res.status(201).json({message: 'quiz created successfully', data: quiz})
    } catch(e) {
        res.status(401).json({error: e.message})
    }
}

const list = async (req, res) => {
    const result = await Quiz.find();
    res.json({data: result})
};

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
    try {
        const quiz = Quiz.findById(id);
        quiz.delete();
        res.status(201).json({message: 'quiz deleted'});
    } catch(e) {
        res.status(401).json({message: 'could not delete quiz ' + e.message});
    }
}

module.exports = { create, list, update, deleteQuiz };