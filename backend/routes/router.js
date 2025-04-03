const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')

//get CSV from the google sheet
const sheetID = "1_FpGoQveJlv1Egrse9kBKIOoEvJdk-6I3-dqA0mv20E";
const sheetName = encodeURIComponent("CMSC Courses");
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

fetch(sheetURL).then((response) => response.text()).then((csvText) => convertCSVCourseText(csvText));

function convertCSVCourseText(csvText){
    //console.log(csvText);
    let courseObjects = csvToCourseObjects(csvText);
    console.log(courseObjects);
}

function csvToCourseObjects(csvText){
    const csvRows = csvText.split("\n");
    const columnNames = splitCSVline(csvRows[0]);
    const startOfData = 1;
    let objects = [];

    for(let i = startOfData; i < csvRows.length; ++i){
        let curr = {};
        let row = splitCSVline(csvRows[i]);
        
        for(let j = 0; j < row.length; ++j){
            curr[columnNames[j]] = row[j];
        }

        objects.push(curr);
    }
    return objects;
}

function splitCSVline(line){
    let splitLine = line.split('","');
    splitLine[0] = splitLine[0].substring(1, );

    splitLine[splitLine.length - 1] = splitLine[splitLine.length - 1].substring(0, splitLine[splitLine.length - 1].length - 1);
    return splitLine;
}



// //will be needed later if we do webscraping to actually put the data into the DB instead of inputting it manually
// router.post('/addCourse', async(req, res) => {
//   const id = 'CMSC 104'
//   const name = 'CMSC 104 - Problem Solving and Computer Programming'
//   const description = 'This course is designed to provide an introduction to problem solving and computer programming that does not require prior programming experience. Elementary problem-solving skills and algorithm development will be introduced. Students will be taught the basic use of a programming environment and basic programming constructs (including loops, control statements, functions, and arrays). This course also teaches students the fundamentals of using the UNIX operating system and introduces general computer science concepts. Note: This course does not fulfill any of the computer science major requirements. Students who have taken and received transfer credit for, or who are taking concurrently any computer programming course in a high-level programming language, will not receive credit for CMSC 104. The list of such computer programming courses includes, but is not limited to AP Computer Science, CMSC 201, CMSC 202, and sections of CMSC 291 that cover programming topics.'
//   const credits = 3
//   const workload = 1
//   const attribute = null
//   const preReqs = null
//   const typicalSem = 0

//   const newCourse = new schemas.Courses({id: id, name: name, description: description, credits:credits, workload: workload, attributes: attribute, preReqs: preReqs, typicalSem: typicalSem})
//   const saveCourse = await newCourse.save()
//   res.end()
// })

router.get('/courses', async(req, res) => {
    const courses = schemas.Courses

    const courseData = await courses.find({}).exec()
    // if (courseData){
    //     res.send(JSON.stringify(courseData))
    // }
    // else{
    //   res.send("Error trying to get the course data")
    // }
    // res.end()

    res.send(JSON.stringify(courseData))
})

router.get('/majors', async(req, res) => {
    const majors = schemas.Majors
    const majorData = await majors.find({}).exec()
    res.send(JSON.stringify(majorData))
})

module.exports = router