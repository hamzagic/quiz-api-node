const express = require('express');
const router = express.Router();

const { create, listByUserId, deleteQuiz } = require('../controllers/QuizController');

router.use((req, res, next) => {
    console.log('router');
    next();
});

router.get('/api/quiz/:id', listByUserId);

router.post('/api/quiz', create);

router.delete('/api/quiz/:id', deleteQuiz)

module.exports = router;
