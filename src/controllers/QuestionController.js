const Question = require('../models/Question');

// TODO: validate if correct answer exists in answers
// TODO: validate total_answers: will not publish question 
// if total_answers != correct answer + answers length
const create = async (req, res) => {
    const title = req.body.title;
    const max_answers = req.body.maxAnswers;
    const correct_answer = req.body.correct;
    const answers = req.body.answers;
    const id = req.body.id
    const quizId = req.body.quizId;

    if (id) {
        await Question.updateOne({_id: id}, {title, max_answers, answers, correct_answer});
        res.status(201).json({message: 'question updated successfully'});
    } else {
        try {
            const question = new Question({
                title, 
                max_answers, 
                correct_answer, 
                answers
            }); 
            await question.save();
            res.status(201).json({message: 'question created', data: question})
        } catch(e) {
            res.status(401).json({error: e.message})
        }
    }
}

const list = async (req, res) => {
   const result = await Question.find();
    res.json({data: result})
};

const update = async (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const max_answers = req.body.maxAnswers;
    const correct_answer_id = req.body.correct;
    const answers_ids = req.body.answers;

    try {
        const question = Question.findById(id);
        question.title = title;
        question.max_answers = max_answers;
        question.correct_answer_id = correct_answer_id;
        question.answers_ids = answers_ids
        await question.save();
        res.status(201).json({message: 'question updated', data: question})
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

const deleteQuestion = async (req, res) => {
    try {
        const question = Question.findById(id);
        question.delete();
        res.status(201).json({message: 'question deleted'});
    } catch(e) {
        res.status(401).json({message: 'could not delete question ' + e.message});
    }
}

module.exports = { create, list, deleteQuestion };