const User = require('../models/User');
const { validationResult } = require('express-validator');
const { 
    getService, 
    listService, 
    createService, 
    updateService, 
    loginService 
} = require('../services/UserService');

const create = async (req, res, next) => {
    const { username, email, password} = req.body;
    if (typeof password !=='string' || typeof username!=='string' || typeof email!=='string') {
        return res.status(400).json({message: 'bad request, verify field types'});
    }

    const user = await createService({username, email, password}); 
    res.status(201).json({message: 'user created', data: user})
}

const login = async(req, res, next) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.json({ success: false, errors: errors.array() });
    // }

    const email = req.body.email;
    const password = req.body.password;

    const user = await loginService(email, password);
    return res.json(user);
}

const list = async (req, res, next) => {
   const result = await listService();
    res.json({data: result})
};

const getById = async(req, res, next) => {
    const id = req.params.id;
    const user = await getService(id);
    res.status(200).json({message: 'ok', data: user})
}

const update = async (req, res, next) => {
    const id = req.body.id;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const user = await updateService(id, {username, email, password});
    res.status(201).json({message: 'user updated', data: user});
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

module.exports = { create, list, update, deleteUser, getById, login };