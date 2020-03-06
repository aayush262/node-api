const Router = require('express').Router();
const upload = require('../middlewares/upload');
const {
  getBootcamps,
  getBootcamp,
  postBootcamp,
  updateBootcamp,
  deleteBootcamp,
  uploadPhoto  
} = require('../controllers/bootcamps');
  
Router.get('/',getBootcamps);

Router.get('/:id',getBootcamp);

Router.post('/',postBootcamp);

Router.put('/:id',updateBootcamp);

Router.delete('/:id',deleteBootcamp);

Router.put('/:id/photo',upload.single('img'),uploadPhoto);

module.exports = Router;