const BootcampModel = require('../model/bootcamp');

module.exports ={
    getBootcamps: async(req,res,next)=>{
       try{
            const bootcamps = await BootcampModel.find({})
            res
                .status(201)
                .json(bootcamps)     
       }
       catch(err){
            return next(err);
       }
    },
    getBootcamp: async(req,res,next)=>{
        try{
            const bootcamp = await BootcampModel.findById(req.params.id);
            res
            .status(201)
            .json(bootcamp);
        }
        catch(err){
            return next(err);
        }
    },
    postBootcamp: async(req,res,next)=>{
       try{
        const data = req.body;
        const newBootcamp = new BootcampModel(data);
        const saved = await newBootcamp.save();
        res
            .status(201)
            .json({
                success: true,
                data: saved
            })
       }
       catch(err){ 
            return next(err);
       }
    },
    updateBootcamp: async(req,res,next)=>{
        try{
            const modifiedBootcamp = await BootcampModel.findByIdAndUpdate(req.params.id,req.body,{
                new: true,
                runValidators: true
            })
            res
                .status(201)
                .json(modifiedBootcamp);
        }catch(err){
            return next(err)
        }
    },
    deleteBootcamp: async(req,res,next)=>{
        try{
            const removedBootcamp = await BootcampModel.findByIdAndRemove(req.params.id);
            res
                .status(201)
                .json(removedBootcamp)
        }catch(err){
            return next(err);
        }
    }
}