const Router = require('express').Router()
const {register,login,loginView} = require('../controllers/auth');

Router.post('/register',register);

Router.post('/login',login);

Router.get('/login',loginView);

module.exports =Router;