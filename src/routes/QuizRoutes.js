const express = require('express');
const router = express.Router();

const { create, list, deleteQuiz } = require('../controllers/QuizController');

router.use((req, res, next) => {
    next();
});

router.get('/api/quiz', list);

router.post('/api/quiz', create);

router.delete('/api/quiz', deleteQuiz)

module.exports = router;
