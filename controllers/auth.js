const asyncHandler = require('../middlewares/async');
const UserModel = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sendMail = require('../utils/sendMail');

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
    },
    forgotPassword: asyncHandler(async(req,res,next)=>{
        const user = await UserModel.findOne({
            email: req.body.email
        }).select('+password')
        var resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex')
        user.resetPasswordExpire = Date.now()+10*60*1000
        await user.save();
        const resetURL = `${req.protocol}://${req.get('host')}/api/v1/resetpassword/${resetToken}`
        const message = `pls click here:${resetURL}`;
        try{
            await sendMail({
                email: req.body.email,
                subject: 'password reset token',
                message
            })
            res.json({
                msg: 'Email sent'
            })
        }catch(err){
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            next('email not sent');
        }
    })
}