const mongoose = require('mongoose')
const Schema = mongoose.Schema

const coursesSchema = new Schema({
    id: {type:String, required:true},
    name: {type:String, required:true},
    description: {type:String},
    credits: {type:Number},
    workload: {type:Number},
    attributes: {type:String},
    preReqs: {type: [String]},
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
        preReqs : [],
        typicalSem : 0
    },
    {
        id : 'CMSC 121',
        name : 'CMSC 121 - Introduction to UNIX',
        description : 'This is an introductory course on UNIX intended primarily for incoming students new to UNIX and to computing at UMBC. Topics include an introduction to the UMBC computing environment, basics of the UNIX environment, e-mail using Pine and the emacs/Xemacs editor. Students are required to obtain a UMBC GL account prior to the first day of class.',
        credits : 1,
        workload : 1,
        attributes : null,
        preReqs : [],
        typicalSem : 0
    },
    {
        id: 'CMSC 435',
        name: 'CMSC 435 - Computer Graphics',
        description: 'Introduction to graphics systems, rasterization, clipping, transformations, modeling, viewing, hidden surface removal, illumination, and shading. Emphasis on realistic, 3D image synthesis.',
        credits: 1,
        workload: 1,
        attributes: null,
        preReqs: ["MATH 221", "CMSC 313", "CMSC 341"],
        typicalSem: 0
    },
    {
        id: 'MATH 221',
        name: 'MATH 221 - Introduction to Linear Algebra',
        description: 'Topics of this course include: linear equations, Gauss-Jordan reduction, matrices and determinants and their properties, vector spaces and subspaces, basis and dimension, linear transformations, kernel and range, eigenvalues and eigenvectors, and matrix diagonalization.',
        credits: 3,
        workload: 1,
        attributes: null,
        preReqs: [],
        typicalSem: 0
    },
    {
        id: 'CMSC 341',
        name: 'CMSC 341 - Data Structures',
        description: 'Topics include asymptotic analysis; various binary search trees, including red-black and splay trees; skip lists as alternatives to binary search trees; data structures for multidimensional data such as K-D trees; heaps and priority queues, including binary heaps, binomial heaps, leftist heaps (and/or other mergeable heaps); B-trees for external storage; other commonly used data structures, such as hash tables and disjoint sets. Programming projects in this course will focus on implementation issues for data structures and on empirical analysis of their asymptotic performance.',
        credits: 3,
        workload: 1,
        attributes: null,
        preReqs: [],
        typicalSem: 0
    },
    {
        id: 'CMSC 313',
        name: 'CMSC 313 - Assembly Language Programming',
        description: 'This course introduces the student to the low-level abstraction of a computer system from a programmer�s point of view, with an emphasis on low-level programming. Topics include data representation, assembly language programming, C programming, the process of compiling and linking, low-level memory management, exceptional control flow, and basic processor architecture.',
        credits: 3,
        workload: 1,
        attributes: null,
        preReqs: [],
        typicalSem: 0
    }
]

majorData = [
    {
        name: 'Computer Science - B.S.',
        credits: 78,
        degreeType: 'B.S.',
        required_courses: ['CMSC 201', 'CMSC 202', 'CMSC 203', 'CMSC 304', 'CMSC 313', 'CMSC 331', 'CMSC 341', 'CMSC 411', 'CMSC 421', 'CMSC 441', 'CMSC 447', 'MATH 151', 'MATH 152', 'MATH 221', 'STAT 355']
    },
    {
        name: 'Information Systems - B.S.',
        credits: 65,
        degreeType: 'B.S.',
        required_courses: ['IS 300', 'IS 310', 'IS 410', 'IS 420', 'IS 425', 'IS 436', 'IS 450', 'IS 451', 'STAT 351', 'MGMT 210', 'ECON 101', 'ECON 102', 'ECON 121', 'ECON 122']
    },
    {
        name: 'Chemical Engineering - Traditional - B.S.',
        credits: 101,
        degreeType: 'B.S.',
        required_courses: []
    },
    {
        name: 'Business Technology Administration - B.A.',
        credits: 65,
        degreeType: 'B.A.',
        required_courses: []
    }
]
async function addToDB(){
    //await Courses.deleteMany();
    await Majors.deleteMany();
    //await //Courses.insertMany(courseData);
    await Majors.insertMany(majorData);
    console.log("Data added to Mongo DB")
}
addToDB()

const mySchemas = {'Courses': Courses, 'Majors': Majors}

module.exports = mySchemas