const { validationResult } = require('express-validator');
const { createService, listByCreatorService } = require('../services/AttemptService');
const { jwtDecode } = require('jwt-decode');

const create = async (req, res) => {
  const { name, email, quizToken, answers } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(200).json({ errors: errors.array() });
  } 
  const result = await createService({name, email, quizToken, answers});
  if (!result.error) {
    res.json({message: 'Quiz submitted successfully', result}); 
  }
}

const listByCreator = async (req, res) => {
  const id = req.params.id;
  const token = req.headers?.token;
  try {
    const decoded = jwtDecode(token);
    if (decoded) {
      if (decoded.id === id) {
        const result = await listByCreatorService(id);
        res.json(result);
      } else {
        res.status(401).json({error: 'Invalid token'});
      }
    }
  } catch (error) {
    res.status(401).json({error: 'Invalid token'});
  }
}

module.exports = { create, listByCreator };