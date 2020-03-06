const Router = require('express').Router();
const bootcampRoutes = require('./routes/bootcamps');
const courseRoutes = require('./routes/course');

Router.use('/v1/bootcamp',bootcampRoutes);
Router.use('/v1/course',courseRoutes);

module.exports = Router;