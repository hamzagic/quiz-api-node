const Answer = require('../models/Answer');
const Question = require('../models/Question');

// create is done in Question
const create = async (req, res, next) => {
    const title = req.body.title;

    const answer = new Answer({title}); 
    await answer.save();
    res.status(201).json({message: 'answer created', data: answer})
}

const list = async (req, res, next) => {
   const result = await Answer.find();
    
    res.json({data: result})
};

const update = async (req, res, next) => {
    const id = req.body.id;
    const title = req.body.title;

    try {
        const answer = Answer.findById(id);
        answer.title = title;
        await answer.save();
        res.status(201).json({message: 'answer updated', data: answer})
    } catch (e) {
        res.status(400).json({error: e.message})
    }

}

const deleteAnswer = async (req, res, next) => {
    const id = req.body.id;
    const question = await Question.find({answers_ids: id});
    console.log(question);

    Question.updateOne({answers_ids: id}, {$pull: {answers_ids:id}}, (err, docs) => {
        if (err){
                console.log(err)
                res.status(401).json({message: 'could not delete answer in question ' + err})
        } else{
            console.log("Deleted : ", docs); 
            Answer.findByIdAndDelete(id, (err2, docs2) => {
                if (err2){
                    console.log(err2)
                    res.status(401).json({message: 'could not delete answer ' + err})
                }
                else{
                    console.log("Deleted : ", docs2);
                    res.status(201).json({message: 'answer deleted everywhere'});
                }
            });
        }
    });
}

module.exports = { create, list, update, deleteAnswer };