const { validationResult } = require('express-validator');
const { createService } = require('../services/AttemptService');

const create = async (req, res) => {
  const { name, email, quizToken, answers } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(200).json({ errors: errors.array() });
  } 
  const result = await createService({name, email, quizToken, answers});
  res.json({result}); 
}

module.exports = { create };