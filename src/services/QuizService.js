const {ObjectId} = require('mongodb');
const Quiz = require('../models/Quiz');

const createService = async({name, creator, totalQuestions, questions}) => {
  // validate questions array
  if (questions.length!== totalQuestions) {
    return {
      error: 'questions array length must be equal to totalQuestions'
    }
  }
  if (questions.length === 0) {
    return {
      error: 'questions array must not be empty'
    }
  }
  // validate if each question has questionText
  array.forEach(element => {
    if (element.questionText === undefined) {
      return {
        error: 'each question must have a questionText'
      }
    }
    // validate if order key is present
    if (element.order === undefined) {
      return {
        error: 'each question must have an order key'
      }
    }
    // validate if each answer has answerText
    element.answers.forEach(answer => {
      if (answer.answerText === undefined) {
        return {
          error: 'each answer must have an answerText'
        }
      }
      if (answer.isCorrect === undefined) {
        return {
          error: 'each answer must have an isCorrect key'
        }
      }
    });
  });
  try {
        const newQuiz = new Quiz(
            {
                quizName: name,
                creator: creator,
                numberOfQuestions: totalQuestions,
                questions: questions,
            }
        );
        await newQuiz.save();
        return newQuiz;
    } catch (error) {
        console.log(error);
    }
}

listByUserIdService = async(id) => {
  try {
        const quiz = await Quiz.find({creator: new ObjectId(id)});
        return quiz;
    } catch (error) {
        console.log(error);
    }
}

const deleteService = async(id) => {
  try {
    const quiz = await Quiz.findOneAndDelete(new ObjectId(id));
    return quiz;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createService, listByUserIdService, deleteService };