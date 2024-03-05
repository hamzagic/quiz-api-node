const Attempt = require('../models/Attempt');
const Quiz = require('../models/Quiz');
const { arrayDifferences, arraysAreEqual } = require('../utils/answersUtils');

const createService = async (data) => {
  const quiz = await Quiz.findOne({sharedLink: data.quizToken, isShared: true, isActive: true});
  const answers = data.answers;
  if (quiz) {
    const correctAnswers = [];
    const getCorrectAnswers = () => {
      quiz.questions.map(question => {
        correctAnswers.push(question.correctAnswerIndex);
      });
      return correctAnswers;
    };
    
    const correctAnswersQuiz = getCorrectAnswers();

    try {
      const newAttempt = new Attempt({
        name: data.name,
        email: data.email,
        quizToken: data.quizToken,
        answers: data.answers,
        differences: arraysAreEqual(correctAnswersQuiz, answers) ? {} : arrayDifferences(correctAnswersQuiz, answers)
      });
      await newAttempt.save();
      return newAttempt;
    } catch (err) {
      console.log(err);
      return {error: err};
    }
  } else {
    return {error: 'Could not save quiz attempt'}
  }
}

module.exports = { createService };