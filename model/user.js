const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema =  new Schema({
    name:{
        type: String,
        required: [true,'Pls provide your name']
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match:[
            /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
            'Please provide a valid email'
        ]
    },
    role:{
        type: String,
        enum: ['user','admin'],
        default: 'user'
    },
    password:{
        type: String,
        required: [true,'Please provide a password'],
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
},{
    timestamps: true
})

userSchema.pre('save', async function(next){
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
        next();
    }catch(err){
        next(err);
    }
})

module.exports = mongoose.model('user',userSchema);