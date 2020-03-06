const Router =require('express').Router()

const {
    getCourses,
    getCourse,
    postCourse,
    updateCourse,
    deleteCourse
} = require('../controllers/course');

Router.get('/',getCourses);
Router.get('/:id',getCourse);
Router.post('/',postCourse);
Router.put('/:id',updateCourse);
Router.delete('/:id',deleteCourse);
 

module.exports = Router;