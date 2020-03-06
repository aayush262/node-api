const BootcampModel = require('../model/bootcamp');
const asyncHandler = require('../middlewares/async');

module.exports ={
    getBootcamps: asyncHandler(async(req,res,next)=>{
        const bootcamps = await BootcampModel.find({})
            res
                .status(201)
                .json(bootcamps)
    }), 
    getBootcamp: asyncHandler(async(req,res,next)=>{
        const bootcamp = await BootcampModel.findById(req.params.id);
        res
        .status(201)
        .json(bootcamp);
    }),
    postBootcamp: asyncHandler(async(req,res,next)=>{
        const data = req.body;
        const newBootcamp = new BootcampModel(data);
        const saved = await newBootcamp.save();
        res
            .status(201)
            .json({
                success: true,
                data: saved
            })
    }),
    updateBootcamp: asyncHandler(async(req,res,next)=>{
        const modifiedBootcamp = await BootcampModel.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators: true
        })
        res
            .status(201)
            .json(modifiedBootcamp);
    }),
    deleteBootcamp: asyncHandler(async(req,res,next)=>{
        const removedBootcamp = await BootcampModel.findByIdAndRemove(req.params.id);
        res
            .status(201)
            .json(removedBootcamp)
    })
}