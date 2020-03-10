const Router = require('express').Router()
const {register,login,loginView,forgotPassword} = require('../controllers/auth');

Router.post('/register',register);

Router.post('/login',login);

Router.get('/login',loginView);

Router.post('/forgotPassword',forgotPassword);

module.exports =Router;