const {ObjectId} = require('mongodb');
const Quiz = require('../models/Quiz');

const createService = async({name, creator, totalQuestions, questions}) => {
  // validate questions array
  if (questions.length != totalQuestions) {
    return {
      error: 'the number of entered questions must match the total questions.'
    }
  }
  if (!questions || questions.length === 0) {
    return {
      error: 'no questions have been entered.'
    }
  }
  // validate if each question has questionText
  questions.forEach(element => {
    if (element.questionText === undefined) {
      return {
        error: 'all questions must be entered.'
      }
    }
    // validate if order key is present
    if (element.order === undefined) {
      return {
        error: 'each question must have an order integer.'
      }
    }
    // validate if answers array has been sent 
    if (element.answers.length === 0) {
      return {
        error: 'no answers have been entered.'
      }
    }
    // validate if each answer has answerText
    // element.answers.forEach(answer => {
    //   if (answer.answerText === undefined) {
    //     return {
    //       error: 'each answer must have a text.'
    //     }
    //   }
    //   if (answer.isCorrect === undefined) {
    //     return {
    //       error: 'each answer must have an isCorrect parameter.'
    //     }
    //   }
    // });
  });
  try {
    const newQuiz = new Quiz(
      {
        quizName: name,
        creator: creator,
        numberOfQuestions: totalQuestions,
        questions: questions,
        created: new Date()
      }
      );
    await newQuiz.save();
    return newQuiz;
    } catch (error) {
      console.log(error);
    }
}

const listByUserIdService = async(id) => {
  try {
        const quiz = await Quiz.find({creator: new ObjectId(id)});
        return quiz;
    } catch (error) {
        console.log(error);
    }
}

const getQuizDetails = async(id, token) => {
  console.log(token);
  try {
    const quiz = await Quiz.findById(new ObjectId(id));
    return quiz;
  } catch (error) {
    console.log('could not retrieve quiz details', error);
  }
}

const deleteService = async(id) => {
  try {
    const quiz = await Quiz.findOneAndDelete(new ObjectId(id));
    return quiz;
  } catch (error) {
    console.log("here", error);
  }
}

module.exports = { createService, listByUserIdService, deleteService, getQuizDetails };