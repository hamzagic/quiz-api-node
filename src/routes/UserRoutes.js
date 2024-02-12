const express = require('express');
const router = express.Router();

const { 
    create, 
    list, 
    update, 
    deleteUser, 
    getById, 
    login 
} = require('../controllers/UserController');

router.use((req, res, next) => {
    console.log('router');
    next();
});

router.get('/api/user', list);

router.post('/api/user', create);

router.post('/api/user/login', login);

router.get('/api/user/:id', getById);

router.post('/api/user/update', update);

router.delete('/api/user', deleteUser);

module.exports = router;
