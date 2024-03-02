const { 
    createService, 
    listByUserIdService, 
    deleteByCreator, 
    getQuizDetails, 
    updateService, 
    shareQuizService,
    getQuizClientData 
} = require('../services/QuizService');
const { validationResult } = require('express-validator');

const create = async (req, res) => {
    const {quizName, creator, numberOfQuestions, questions} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() });
    }
    try {
        const quiz = await createService({quizName, creator, numberOfQuestions, questions});
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
const update = async (req, res) => {
    const {quizName, creator, numberOfQuestions, questions} = req.body;
    const id = req.params.id;
    const result = await updateService(id, {quizName, creator, numberOfQuestions, questions});
    res.json({data: result});
}

const deleteQuiz = async (req, res) => {
    const id = req.params.id;
    const creatorId = req.params.creator;
    const result = await deleteByCreator(id, creatorId);
    res.json({data: result});
}

const share = async (req, res) => {
    const id = req.params.id;
    const creatorId = req.params.creator;
    const result = await shareQuizService(id, creatorId);
    res.json({data: result});
}

const renderOnPage = async (req, res) => {
    const id = req.params.id;
    const result = await getQuizClientData(id);
    res.json({data: result});
}

module.exports = { create, listByUserId, update, deleteQuiz, getDetails, share, renderOnPage };