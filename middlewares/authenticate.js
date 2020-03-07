const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const UserModel = require('../model/user');

module.exports = asyncHandler(async(req,res,next)=>{
    var token;
    if(req.cookies.token){
        token = req.cookies.token
    }
    if(token){  
        const decoded = await jwt.verify(token,process.env.SECRET_KEY)
        const user = await UserModel.findById(decoded._id).select('+password');
        if(!user){
            return next('no such user')
        }
        req.loggedInUser = user;
        next();
    }else{
        next('token not provided')
    }
})