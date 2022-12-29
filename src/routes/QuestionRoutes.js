const express = require('express');
const router = express.Router();

const { create, list, deleteQuestion } = require('../controllers/QuestionController');

router.use((req, res, next) => {
    console.log('router');
    next();
});

router.get('/api/question', list);

router.post('/api/question', create);

router.delete('/api/question', deleteQuestion)

module.exports = router;
