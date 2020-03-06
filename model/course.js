const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema  = new Schema({
    title: {
        type: String,
        trim: true,
        required: [true,'Please add a title']
    },
    description:{
        type: String,
        required: [true,'pls add a description']
    },
    weeks:{
        type: String,
        required: [true,'pls provide weeks']
    },
    tuition:{
        type: Number,
        required: [true,'pls provide tution cost']
    },
    minimumSkill:{
        type: String,
        enum: ['beginner','intermediate','advanced']
    },
    scholarshipAvailable:{
        type: Boolean,
        default: false
    },
    bootcamp:{
        type: Schema.Types.ObjectId,
        ref: 'bootcamp',
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('course',courseSchema);