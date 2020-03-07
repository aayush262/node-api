const asyncHandler = require('../middlewares/async');
const UserModel = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const createToken = (data) =>{
    let token = jwt.sign({
        _id: data._id,
         role: data.role,
        name: data.name
    },process.env.SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRE
    });
    return token;
}

const sendTokenResponse = (user,res)=>{
    var token = createToken(user);
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 1000 * 60 * 60 * 24 
        ),
        httpOnly:true
    }
    res
        .status(200)
        .cookie('token',token,options)
        .json({
            user,
            token
        })
}

module.exports ={
    register: asyncHandler(async(req,res,next)=>{
        const newUser = new UserModel(req.body);
        const saved = await newUser.save();
        var token = createToken(newUser);
        res
            .status(201)
            .json({
                saved,
                token
            })
    }),
    login:asyncHandler(async(req,res,next)=>{
      const user = await UserModel.findOne({
          email: req.body.email
      }).select('+password')
      if(!user){
          return next('no user found')
      }
      var isMatched = await bcrypt.compare(req.body.password,user.password);
      if(!isMatched){
          return next('invalid password')
      }
      sendTokenResponse(user,res);
    }),
    loginView: function(req,res,next){
        res.render('login.ejs');
    }
}