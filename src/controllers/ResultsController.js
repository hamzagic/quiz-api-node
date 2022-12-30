const Result = require('../models/Results');
const Question = require('../models/Question');

// create is done in Question
const create = async (req, res) => {
    const title = req.body.title;

    const result = new Result({title}); 
    await result.save();
    res.status(201).json({message: 'answer created', data: result})
}

const list = async (req, res) => {
   const result = await Result.find();
    
    res.json({data: result})
};

const update = async (req, res) => {
    const id = req.body.id;
    const title = req.body.title;

    try {
        const result = Result.findById(id);
        result.title = title;
        await result.save();
        res.status(201).json({message: 'answer updated', data: result})
    } catch (e) {
        res.status(400).json({error: e.message})
    }

}

const deleteAnswer = async (req, res) => {
    const id = req.body.id;
    const question = await Question.find({answers_ids: id});
    console.log(question);

    Question.updateOne({answers_ids: id}, {$pull: {answers_ids:id}}, (err, docs) => {
        if (err){
                console.log(err)
                res.status(401).json({message: 'could not delete answer in question ' + err})
        } else{
            console.log("Deleted : ", docs); 
            Result.findByIdAndDelete(id, (err2, docs2) => {
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