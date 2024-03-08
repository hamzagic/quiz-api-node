const { ObjectId } = require('mongodb');
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
    const differences = arrayDifferences(correctAnswersQuiz, answers);

    const getScore = () => {
      const totalQuestions = quiz.questions.length;
      const totalErrors = differences.wrong;
      // const totalErrors = differences && differences.length > 0 ? differences.length : 0;
      return `${totalQuestions - totalErrors} / ${totalQuestions}`;
    }

    try {
      const newAttempt = new Attempt({
        name: data.name,
        email: data.email,
        quizToken: data.quizToken,
        answers: data.answers,
        answerData: differences.differences,
        score: getScore(),
        quiz,
        creator: quiz.creator
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

// todo: move this method to QuizServices
const listByCreatorService = async (id) => {
  // list all quizzes by creator which has a shared link
  try {
    const quiz = await Quiz.find({creator: id, sharedLink: { $exists:true }});
    return quiz;
    
  } catch (error) {
    return error;
  }
}

// todo: add a limit
const listAttemptsService = async (id) => {
  try {
    const results = await Attempt.aggregate([
      // Match documents with the given creator ID
      { $match: { creator: id } },
    
      {
        $facet: {
          data: [{ $match: {} }], 
          totalCount: [{ $count: 'count' }]
        }
      }
    ]);
  
    const attempts = results[0].data;
    const totalCount = results[0].totalCount.length > 0 ? results[0].totalCount[0].count : 0;
  
    return { totalCount, attempts };
    
  } catch (error) {
    return error;
  }
}

module.exports = { createService, listByCreatorService, listAttemptsService };