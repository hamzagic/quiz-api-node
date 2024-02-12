const Quiz = require('../models/Quiz');
const { createService, listByUserIdService, deleteService } = require('../services/QuizService');

const create = async (req, res) => {
    const {name, creator, totalQuestions, questions} = req.body;
    if(!name ||!creator ||!totalQuestions ||!questions) {
        res.status(400).json({error: 'name, creator, totalQuestions, questions are required'})
    }

    questions.forEach(question => {
        if(!question.questionText ||!question.order ||!question.answers) {
            res.status(400).json({error: 'questionText, order, answers are required'});
        }
        question.answers.forEach(answer => {
            if(!answer.answerText || answer.isCorrect == undefined) {
                res.status(400).json({error: 'answerText and isCorrect are required'})
            }
        });
    });
    try {
        const quiz = await createService({name, creator, totalQuestions, questions});
        if(quiz.error) {
            res.status(400).json({error: quiz.error})
        } else {
            res.status(201).json({message: 'quiz created successfully', data: quiz})
        }
    } catch(e) {
        res.status(401).json({error: e.message})
    }
}

const listByUserId = async (req, res) => {
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

module.exports = { create, listByUserId, update, deleteQuiz };