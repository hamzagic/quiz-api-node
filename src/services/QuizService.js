const {ObjectId} = require('mongodb');
const Quiz = require('../models/Quiz');
const { v4: uuidv4 } = require('uuid');

const createService = async({quizName, creator, numberOfQuestions, questions}) => {
  // validate questions array
  if (questions.length != numberOfQuestions) {
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
  });
  try {
    const newQuiz = new Quiz(
      {
        quizName: quizName,
        creator: creator,
        numberOfQuestions: numberOfQuestions,
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

const updateService = async(id, data) => {
  console.log(data);
  try {
    const quiz = await Quiz.findByIdAndUpdate(new ObjectId(id), data, {new: true});
    return quiz;
  } catch (error) {
    console.log('could not update quiz')
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

const deleteByCreator = async(quizId, creatorId) => {
  try {
    const quiz = await Quiz.findOneAndDelete({_id: new ObjectId(quizId), creator: creatorId});
    return quiz;
  } catch (error) {
    console.log(error);
  }
}

const shareQuizService = async (quizId, creatorId) => {
  const sharedToken = uuidv4();
  try {
    const quiz = await Quiz.findOneAndUpdate({ _id: quizId, creator: creatorId }, {sharedLink: sharedToken, isShared: true}, { new: true });
    if (quiz) {
      return quiz;
    } else { 
      return 'Could not share quiz';
    }
  } catch (error) {
    console.log(error);
  }
}

const getQuizClientData = async (id) => {
  try {
    const quiz = await Quiz.findOne({sharedLink: id});
    const updatedQuestions = [];
    quiz.questions.map(question => {
      const el = {
        questionText: question.questionText,
        answers: question.answers,
        order: question.order,
        questionImage: question.questionImage,
      }
      updatedQuestions.push(el);
    })
    const quizData = {
      id: quiz._id,
      creator: quiz.creator,
      created: quiz.created,
      isActive: quiz.isActive,
      isShared: quiz.isShared,
      numberOfQuestions: quiz.numberOfQuestions,
      quizName: quiz.quizName,
      sharedLink: quiz.sharedLink,
      questions: updatedQuestions
    }
    return quizData;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { 
  createService, 
  listByUserIdService, 
  deleteService, 
  getQuizDetails, 
  deleteByCreator, 
  updateService,
  shareQuizService,
  getQuizClientData
};