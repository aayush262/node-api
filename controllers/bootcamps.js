module.exports ={
    getBootcamps: (req,res,next)=>{
        res
            .status(200)
            .json({
                success: true,
                msg: 'Show all bootcamps'
            })
    },
    getBootcamp: (req,res,next)=>{
        res
            .status(200)
            .json({
                success:true,
                msg: `Show bootcamp ${req.params.id}`
            })
    }
}