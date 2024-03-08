const express = require('express');
const router = express.Router();

const { create, listByCreator, list } = require('../controllers/AttemptController');
const attemptValidation = require('../validations/attemptValidation');

router.use((req, res, next) => {
  next();
});

router.post('/api/quiz/attempt', attemptValidation.attemptInputValidation, create);

router.post('/api/quiz/attempts/list', list);

router.post('/api/quiz/attempt/list/:id', listByCreator);


module.exports = router;