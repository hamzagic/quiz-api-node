const Attempt = require('../models/Attempt');
const Quiz = require('../models/Quiz');

const createService = async (data) => {
  const quiz = await Quiz.findOne({sharedLink: data.quizToken, isShared: true, isActive: true});
  if (quiz) {
    try {
      const newAttempt = new Attempt({
        name: data.name,
        email: data.email,
        quizToken: data.quizToken,
        answers: data.answers
      });
      await newAttempt.save();
      return true;
    } catch (err) {
      console.log(err);
      return {error: err};
    }
  } else {
    return {error: 'No quiz found'}
  }
}

module.exports = { createService };