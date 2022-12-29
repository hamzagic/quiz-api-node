const Question = require('../models/Question');
const Answer = require('../models/Answer');

// TODO: validate if correct answer exists in answers
// TODO: validate total_answers: will not publish question 
// if total_answers != correct answer + answers length
const create = async (req, res) => {
    const title = req.body.title;
    const max_answers = req.body.maxAnswers;
    const correct_answer = req.body.correct;
    const answers = req.body.answers;
    const id = req.body.id

    if (id) {
        Question.findByIdAndUpdate(id, {title, max_answers}, (err, docs) => {
            if(err) {
                res.status(401).json({error: err});
            }
            if(docs) {
                res.status(201).json({data: docs});
            }
        });
    } else {
        try {
            const answer = new Answer({title: correct_answer});
            let otherAnswers = [];
            let otherAnswersIds = [];
            answers.map(title => {
                otherAnswers = new Answer({title: title});
                console.log('hsdfs', otherAnswers)
                otherAnswers.save();
                otherAnswersIds.push(otherAnswers._id);
            });
            answer.save(); 
            const question = new Question({
                title, 
                max_answers, 
                correct_answer_id: answer._id, 
                answers_ids: otherAnswersIds
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

const update = async (req, res, next) => {
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

module.exports = { create, list, update, deleteQuestion };