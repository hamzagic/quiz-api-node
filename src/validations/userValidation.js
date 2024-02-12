const { check } = require('express-validator');

const userInputValidation = [
  check('email', 'Invalid email address').isEmail().escape(),
  check('password').isLength({ min: 6 })
  .withMessage('Password must be at least 6 characters')
  .matches('[0-9]').withMessage('Password must contain at least one number')
  .matches('[a-z]').withMessage('Password must have at least one lowercase character')
  .matches('[A-Z]').withMessage('Password must have at least one uppercase character')
  // .matches('[!@#$%&*-_]').withMessage('Password must have at least one special character')
  .trim().escape()
];

const userEmailValidation = [
  check('email', 'Invalid email address').isEmail().escape(),
];

const userPasswordValidation = [
  check('password').isLength({ min: 6 }).trim().escape()
];

const userLoginValidation = [
  check('email', 'Invalid email address').isEmail().escape(),
  check('password').trim().isLength({ min: 1 }).escape()
]

module.exports = { userInputValidation, userEmailValidation, userPasswordValidation, userLoginValidation }