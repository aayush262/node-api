const Router = require('express').Router();

const {
  getBootcamps,
  getBootcamp,
  postBootcamp,
  updateBootcamp,
  deleteBootcamp  
} = require('../controllers/bootcamps');

Router.get('/',getBootcamps);

Router.get('/:id',getBootcamp);

Router.post('/',postBootcamp);

Router.put('/:id',updateBootcamp);

Router.delete('/:id',deleteBootcamp);


module.exports = Router;