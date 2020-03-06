const CourseModel = require('../model/course');
const asyncHandler = require('../middlewares/async');

module.exports= {
    getCourses: asyncHandler(async (req,res,next)=>{
        const courses = await CourseModel.find({}).populate({
            path: 'bootcamp',
            select: 'name description'
        })
        res
            .status(201)
            .json({
                total: courses.length,
                courses
            });
    }),
    getCourse: asyncHandler(async(req,res,next)=>{
        const course =  await CourseModel.findById(req.params.id).populate({
            path: 'bootcamp',
            select: 'name description'
        })
        if(!course){
            return next('course not found')
        }
        res
            .status(201)
            .json(course)   
    }),
    postCourse: asyncHandler(async(req,res,next)=>{
        const newCourse = new CourseModel(req.body);
        const saved = await newCourse.save();
        res
            .status(201)
            .json(saved)
    }),
    updateCourse: asyncHandler(async(req,res,next)=>{
        const updatedCourse = await CourseModel.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators: true
        })
        res
            .status(201)
            .json(updatedCourse)
    }),
    deleteCourse: asyncHandler(async(req,res,next)=>{
        const deletedCourse = await CourseModel.findByIdAndRemove(req.params.id)
        res
            .staus(201)
            .json(deletedCourse)
    })
}