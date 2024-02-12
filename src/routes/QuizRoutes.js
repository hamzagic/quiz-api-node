const express = require('express');
const router = express.Router();

const { create, listById, deleteQuiz } = require('../controllers/QuizController');

router.use((req, res, next) => {
    console.log('router');
    next();
});

router.get('/api/quiz', listById);

router.post('/api/quiz', create);

router.delete('/api/quiz', deleteQuiz)

module.exports = router;
