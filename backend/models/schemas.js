const mongoose = require('mongoose')
const Schema = mongoose.Schema

const coursesSchema = new Schema({
    id: {type:String, required:true},
    name: {type:String, required:true},
    description: {type:String},
    credits: {type:Number},
    workload: {type:Number},
    attributes: {type:String},
    preReqs: {type:Map, of:String},
    typicalSem: {type:Number}
});

const majorSchema = new Schema({
    name: {type:String, required:true},
    credits: {type: Number},
    degreeType: {type:String},
    required_courses: {type: [String]}
});

const Courses = mongoose.model('Courses', coursesSchema, 'courses');
const Majors = mongoose.model('Majors', majorSchema, 'majors');

courseData = [
    {
        id : 'CMSC 104',
        name : 'CMSC 104 - Problem Solving and Computer Programming',
        description : 'This course is designed to provide an introduction to problem solving and computer programming that does not require prior programming experience. Elementary problem-solving skills and algorithm development will be introduced. Students will be taught the basic use of a programming environment and basic programming constructs (including loops, control statements, functions, and arrays). This course also teaches students the fundamentals of using the UNIX operating system and introduces general computer science concepts. Note: This course does not fulfill any of the computer science major requirements. Students who have taken and received transfer credit for, or who are taking concurrently any computer programming course in a high-level programming language, will not receive credit for CMSC 104. The list of such computer programming courses includes, but is not limited to AP Computer Science, CMSC 201, CMSC 202, and sections of CMSC 291 that cover programming topics.',
        credits : 3,
        workload : 1,
        attributes : null,
        preReqs : null,
        typicalSem : 0
    },
    {
        id : 'CMSC 121',
        name : 'CMSC 121 - Introduction to UNIX',
        description : 'This is an introductory course on UNIX intended primarily for incoming students new to UNIX and to computing at UMBC. Topics include an introduction to the UMBC computing environment, basics of the UNIX environment, e-mail using Pine and the emacs/Xemacs editor. Students are required to obtain a UMBC GL account prior to the first day of class.',
        credits : 1,
        workload : 1,
        attributes : null,
        preReqs : null,
        typicalSem : 0
    },
    {
        id: 'Course 1',
        name: 'Course 1',
        description: 'This is an introductory course on UNIX intended primarily for incoming students new to UNIX and to computing at UMBC. Topics include an introduction to the UMBC computing environment, basics of the UNIX environment, e-mail using Pine and the emacs/Xemacs editor. Students are required to obtain a UMBC GL account prior to the first day of class.',
        credits: 1,
        workload: 1,
        attributes: null,
        preReqs: null,
        typicalSem: 0
    }
]

majorData = [
    {
        name: 'Computer Science - B.S.',
        credits: 78,
        degreeType: 'B.S.',
        required_courses: ['CMSC 201', 'CMSC 202', 'CMSC 203', 'CMSC 304', 'CMSC 313', 'CMSC 331', 'CMSC 341', 'CMSC 411', 'CMSC 421', 'CMSC 441', 'CMSC 447', 'MATH 151', 'MATH 152', 'MATH 221', 'STAT 355']
    }
]
async function addToDB(){
    await Courses.deleteMany();
    await Majors.deleteMany();
    await Courses.insertMany(courseData);
    await Majors.insertMany(majorData);
    console.log("Data added to Mongo DB")
}
addToDB()

const mySchemas = {'Courses': Courses, 'Majors': Majors}

module.exports = mySchemas