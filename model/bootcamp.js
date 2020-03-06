const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder')
const Schema = mongoose.Schema;

const bootcampSchema = new Schema({
    name: {
        type: String,
        required: [true,'Pls provide a name'],
        unique: true,
        trim: true,
        maxlength: [50,'No more than 50 characters']
    },
    slug: String,
    description: {
        type: String,
        required: [true,'Pls provide a description'],
        maxlength: [200,'No more than 200 characters']
    },
    website: {
        type: String,
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please provide a valid http or https'
        ]
    },
    phone:{
        type: String,
        maxlength: [20,'Phone number should not be more than 20 characters']
    },
    email:{
        type: String,
        match:[
            /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
            'Please provide a valid email'
        ]
    },
    address:{
        type: String,
        required: [true,'Please add an address']
    },
    location:{
        type: {
            type: String,
            enum: ['point']
        },
        coordinates:{
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
    },
    careers: {
        type: [String],
        enum: [
            'Web Development',
            'Mobile App Development',
            'UI/UX',
            'Data Science',
            'Business',
            'Other'
        ],
        required: true
       
    },
    averageRating: {
        type: Number,
        min: [1,'must be at least 1'],
        max: [10,'must not be greater than 10']
    },
    averageCost: {
        type: Number
    },
    photo:{
        type: String,
        default:'no-photo.jpg'
    },
    housing:{
        type: Boolean,
        default: false
    },
    jobAssistance:{
        type: Boolean,
        default: false
    },
    jobGuarantee:{
        type: Boolean,
        default: false
    },
    acceptGi:{
        type: Boolean,
        default: false
    }
},{
    timestamps:true
})

bootcampSchema.pre('save',function(next){
    this.slug = slugify(this.name,{
        lower: true,
        replacement: '-'
    })
    next();
})
bootcampSchema.pre('save',async function(next){
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type: 'point',
        coordinates: [loc[0].longitude,loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        street: loc[0].streetName,
        city: loc[0].city,
        state: loc[0].stateCode,
        zipcode: loc[0].zipcode,
        country: loc[0].country
    }
    next()
}) 

module.exports = mongoose.model('bootcamp',bootcampSchema);