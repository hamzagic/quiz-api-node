const express = require('express');
const router = express.Router();

const { create, list, update, deleteAnswer } = require('../controllers/AnswerController');

router.use((req, res, next) => {
    console.log('router');
    next();
});

router.get('/api/answer', list);

router.post('/api/answer', create);

router.post('/api/answer-update', update);

router.delete('/api/answer', deleteAnswer);

module.exports = router;
