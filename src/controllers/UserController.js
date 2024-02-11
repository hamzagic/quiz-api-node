const User = require('../models/User');

const create = async (req, res, next) => {
    const { username, email, password} = req.body;

    const user = new User({username, email, password}); 
    await user.save();
    res.status(201).json({message: 'user created', data: user})
}

const list = async (req, res, next) => {
   const result = await User.find();
    
    res.json({data: result})
};

const update = async (req, res, next) => {
    const id = req.body.id;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = User.findById(id);
        user.username = username;
        user.email = email;
        user.password = password;

        await user.save();
        res.status(201).json({message: 'user updated successfully', data: user})
    } catch (e) {
        res.status(400).json({error: e.message})
    }

}

// todo: refactor method to delete also all quizzes related to the user
const deleteUser = async (req, res, next) => {
    const id = req.body.id;
    const user = await User.find({id: id});
    console.log(user);

    User.updateOne({answers_ids: id}, {$pull: {answers_ids:id}}, (err, docs) => {
        if (err){
                console.log(err)
                res.status(401).json({message: 'could not delete answer in question ' + err})
        } else{
            console.log("Deleted : ", docs); 
            User.findByIdAndDelete(id, (err2, docs2) => {
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

module.exports = { create, list, update, deleteUser };