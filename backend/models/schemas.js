const mongoose = require('mongoose')
const Schema = mongoose.Schema

const coursesSchema = new Schema({
    name: {type:String},
    description: {type:String},
    credits: {type:Number}
})

const Courses = mongoose.model('Courses', coursesSchema, 'courses')
const mySchemas = {'Courses': Courses}

module.exports = mySchemas