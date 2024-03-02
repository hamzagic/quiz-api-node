const express = require('express');
const router = express.Router();
const quizValidation = require('../validations/quizValidation');

const { create, listByUserId, deleteQuiz, getDetails, update, share, renderOnPage } = require('../controllers/QuizController');

router.use((req, res, next) => {
    console.log('router');
    next();
});

router.get('/api/quiz/:id', listByUserId);

router.post('/api/quiz', quizValidation.quizInputValidation, create);

router.delete('/api/quiz/:creator/:id', deleteQuiz);

router.get('/api/quiz/details/:id', getDetails);

router.post('/api/quiz/update/:id', update);

router.post('/api/quiz/share/:creator/:id', share);

router.get('/api/client/:id', renderOnPage);

module.exports = router;
