const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')

//get CSV from the google sheet
const sheetID = "1_FpGoQveJlv1Egrse9kBKIOoEvJdk-6I3-dqA0mv20E";
const sheetName = encodeURIComponent("CMSC Courses");
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

fetch(sheetURL)
.then((response) => response.text())
.then((csvText) => convertCSVCourseText(csvText));

function convertCSVCourseText(csvText){
    //console.log(csvText);
    let courseObjects = csvToCourseObjects(csvText);
    //console.log(courseObjects);
    addCSVToDB(courseObjects);
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
            if(columnNames[j] === "credits" || columnNames[j] === "workload" || columnNames[j] === "typicalSem"){
                curr[columnNames[j]] = Number(row[j]);
            } else if(columnNames[j] === "preReqs"){
                if(row[j] === "null"){
                    curr[columnNames[j]] = [];
                }else{
                    curr[columnNames[j]] = row[j].split(", ");
                }
            } else if(columnNames[j] === "attributes"){
                if(row[j] === "null"){
                    curr[columnNames[j]] = null;
                }else{
                    curr[columnNames[j]] = row[j];
                }
            }else{
                curr[columnNames[j]] = row[j];
            }  
        }

        objects.push(curr);
    }
    return objects;
}

function splitCSVline(line){
    let splitLine = line.split('","');
    splitLine[0] = splitLine[0].substring(1);

    splitLine[splitLine.length - 1] = splitLine[splitLine.length - 1].substring(0, splitLine[splitLine.length - 1].length - 1);
    return splitLine;
}

async function addCSVToDB(objs){
    const courses = schemas.Courses
    const courseData = await courses.find({}).exec()
    for(let i = 0; i < objs.length; ++i){
        let flag = false;
        let obj = objs[i];

        for(let j = 0; j < courseData.length; ++j){
            if(obj.id === courseData[j].id){
                flag = true
            }
        }
        
        if(!flag){
            courses.insertOne(obj);
        }
    }
        
}


// //will be needed later if we do webscraping to actually put the data into the DB instead of inputting it manually
router.post('/addCourse', async(req, res) => {
    let newDocument = req.body;
    await schemas.Courses.insertOne(newDocument);
//   res.end()
})

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