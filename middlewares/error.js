const errorHandler = (error,req,res,next)=>{
    res.status(400).json({
        msg: error
    })
}

module.exports = errorHandler;
