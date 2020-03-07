const Router = require('express').Router();
const bootcampRoutes = require('./routes/bootcamps');
const courseRoutes = require('./routes/course');
const authRoutes = require('./routes/auth');
const authenticate = require('./middlewares/authenticate');

Router.use('/v1/bootcamp',authenticate,bootcampRoutes);

Router.use('/v1/course',authenticate,courseRoutes);

Router.use('/v1/auth',authRoutes);

module.exports = Router;