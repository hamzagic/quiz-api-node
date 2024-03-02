const { check } = require('express-validator');

const attemptInputValidation = [
  check('name').trim().isLength({min: 1}).escape().withMessage('Name is required'),
  check('answers').isArray().withMessage('Invalid answers format'),
  check('email').isEmail().optional({nullable: true, checkFalsy: true}),
  check('quizToken').trim().escape().notEmpty().withMessage('Missing token')
];

module.exports = { attemptInputValidation };