const express = require('express');
const router = express.Router();

const { create, list, update, deleteUser, getById } = require('../controllers/UserController');

router.use((req, res, next) => {
    console.log('router');
    next();
});

router.get('/api/user', list);

router.post('/api/user', create);

router.get('/api/user/:id', getById);

router.post('/api/user/update', update);

router.delete('/api/user', deleteUser);

module.exports = router;
