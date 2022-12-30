const Quiz = require('../models/Quiz');

const create = async (req, res) => {
    const title = req.body.title;
    const total_questions = req.body.total_questions;
    const questions = req.body.questions
    const id = req.body.id;

    if (id) {
        await Quiz.updateOne({_id: id}, {title, total_questions, questions});
        res.status(201).json({message: 'Quiz updated successfully'});
    } else {
        try {
            const quiz = new Quiz({
                title, 
                total_questions, 
                questions
            }); 
            await quiz.save();
            res.status(201).json({message: 'question created', data: quiz})
        } catch(e) {
            res.status(401).json({error: e.message})
        }
    }
}

const list = async (req, res) => {
    // const result = await Quiz.find();
    //result ? res.json({data: result}) : res.json({data: []})
};

const deleteQuiz = async (req, res) => {
    try {
        const quiz = Quiz.findById(id);
        quiz.delete();
        res.status(201).json({message: 'quiz deleted successfully'});
    } catch(e) {
        res.status(401).json({message: 'could not delete quiz ' + e.message});
    }
}



module.exports = { create, list, deleteQuiz };