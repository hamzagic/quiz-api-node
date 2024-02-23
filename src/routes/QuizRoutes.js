const express = require('express');
const router = express.Router();
const quizValidation = require('../validations/quizValidation');

const { create, listByUserId, deleteQuiz, getDetails } = require('../controllers/QuizController');

router.use((req, res, next) => {
    console.log('router');
    next();
});

router.get('/api/quiz/:id', listByUserId);

router.post('/api/quiz', quizValidation.quizInputValidation, create);

router.delete('/api/quiz/:id', deleteQuiz);

router.get('/api/quiz/details/:id', getDetails);

module.exports = router;
