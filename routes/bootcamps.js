const Router = require('express').Router();
const bootcampController = require('../controllers/bootcamps');

Router.get('/',bootcampController.getBootcamps);

Router.get('/:id',bootcampController.getBootcamp);

module.exports = Router;