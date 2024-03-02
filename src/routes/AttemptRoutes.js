const express = require('express');
const router = express.Router();

const { create } = require('../controllers/AttemptController');
const attemptValidation = require('../validations/attemptValidation');

router.use((req, res, next) => {
  next();
});

router.post('/api/quiz/attempt', attemptValidation.attemptInputValidation, create);

module.exports = router;