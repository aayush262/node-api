const BootcampModel = require('../model/bootcamp');
const asyncHandler = require('../middlewares/async');
const fs = require('fs');
const path = require('path');

module.exports ={
    getBootcamps: asyncHandler(async(req,res,next)=>{
        const page = Number(req.query.page)||1;
        const perPage = Number(req.query.perPage)||1;
        const skipCount = (page-1)*perPage;
        const bootcamps = await BootcampModel
            .find({})
            .limit(perPage)
            .skip(skipCount)
            .exec()
        res
            .status(201)
            .json({
                total: bootcamps.length,
                bootcamps
            })
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
    }),
    uploadPhoto: asyncHandler(async(req,res,next)=>{
        const bootcamp = await BootcampModel.findById(req.params.id);
        if(!bootcamp){
            return res.status(400).json({
                msg: 'bootcamp not found'
            })
        }
        if(!req.file){
            return res.status(400).json({
                msg: 'Pls upload an image'
            })
        }
        if(req.fileErr){
            return res.status(400).json({
                msg: 'invalid format'
            })
        }
        var oldPhoto = bootcamp.photo;
        if(req.file){
            if(oldPhoto === 'no-photo.jpg'){
                const updatedBootcamp = await BootcampModel.findByIdAndUpdate(req.params.id,{
                    photo: req.file.filename
                },{
                    new: true,
                    runValidators: true
                })
                res.status(201).json(updatedBootcamp)
            }else{
                fs.unlink(path.join(process.cwd(),'/public/images/'+oldPhoto),function(err,done){
                    if(err){
                        return next(err)
                    }
                    BootcampModel.findByIdAndUpdate(req.params.id,{
                        photo: req.file.filename
                    },{
                        new: true,
                        runValidators: true
                    }).exec(function(err,updated){
                        if(err){
                            return next(err)
                        }
                        res.status(201).json(updated);
                    })
                })
            }
        }
    })
}