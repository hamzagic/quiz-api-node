const { check } = require('express-validator');

const quizInputValidation = [
  check('name').trim().isLength({ min: 6 }).escape().withMessage('A quiz name is required'),
  check('creator').trim().isLength({ min: 3}).escape().withMessage('Quiz creator is required'),
  check('totalQuestions').trim().isInt().withMessage('Total questions must be an integer'),
  check('questions').isArray().withMessage('invalid questions array')
];


module.exports = { quizInputValidation };