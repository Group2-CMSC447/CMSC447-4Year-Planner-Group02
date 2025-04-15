const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')

//get CSV from the google sheet
const sheetID = "1_FpGoQveJlv1Egrse9kBKIOoEvJdk-6I3-dqA0mv20E";
const sheetName = encodeURIComponent("CMSC Courses");
const sheetName2 = encodeURIComponent("CMSC Default");
const sheetName3 = encodeURIComponent("Departments");
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;
const sheetURLDefault = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:csv&sheet=${sheetName2}`;
const sheetURLDepartments = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:csv&sheet=${sheetName3}`;

//grabs csv from google sheets
fetch(sheetURL)
.then((response) => response.text())
.then((csvText) => convertCSVCourseText(csvText));

fetch(sheetURLDefault)
.then((response) => response.text())
.then((csvText) => convertCSVDefaultText(csvText));

//conversion and add function
function convertCSVDefaultText(csvText){
    //console.log(csvText);
    let defaultObjects = csvToDefaultObjects(csvText);
    //console.log(defaultObjects);
    addDefaultCSVToDB(defaultObjects);
}

//runs conversion and add function
function convertCSVCourseText(csvText){
    //console.log(csvText);
    let courseObjects = csvToCourseObjects(csvText);
    //console.log(courseObjects);
    addCourseCSVToDB(courseObjects);
}

//parse csv text for default schedule
function csvToDefaultObjects(csvText){
    const csvRows = csvText.split("\n"); //split each row at newline
    const majorInfo = splitCSVline(csvRows[0]); //get first 3 inputs of major
    const startofData = 1; //index at one to ignore row with other info
    let objects = []; //where to put complete objects

    let curr = {}; //current object

    curr["name"] = majorInfo[0];
    curr["credits"] = Number(majorInfo[1]);
    curr["degreeType"] = majorInfo[2];

    let required_courses = [];

    for(i = startofData; i < csvRows.length; ++i){
        let row = splitCSVline(csvRows[i]);
        let name = row[0];
        required_courses.push({[row[0]]: [row[1], row[2]]});
    }
    curr["required_courses"] = required_courses;
    objects.push(curr);
    return objects;
}

//parse csv text
function csvToCourseObjects(csvText){
    const csvRows = csvText.split("\n"); //split each row at newline
    const columnNames = splitCSVline(csvRows[0]); // get the names of the columns for each variable name
    const startOfData = 1; //index at one to ignore row with names
    let objects = []; //where to put complete objects

    // loop through csv rows
    for(let i = startOfData; i < csvRows.length; ++i){
        let curr = {}; //current object
        let row = splitCSVline(csvRows[i]); //split each row by cell
        
        //loop through each cell of a row
        for(let j = 0; j < row.length; ++j){
            //check if variable should be a number
            if(columnNames[j] === "credits" || columnNames[j] === "workload" || columnNames[j] === "typicalSem"){
                curr[columnNames[j]] = Number(row[j]);

            //check for preReqs parsing
            } else if(columnNames[j] === "preReqs"){
                if(row[j] === "null"){
                    curr[columnNames[j]] = [];
                }else{
                    curr[columnNames[j]] = row[j].split(", "); //parse by ", "
                }
            
            //check for attributes for null
            } else if(columnNames[j] === "attributes"){
                if(row[j] === "null"){
                    curr[columnNames[j]] = null;
                }else{
                    curr[columnNames[j]] = row[j];
                }
            
            //add as string
            }else{
                curr[columnNames[j]] = row[j];
            }  
        }

        //add to list of objects
        objects.push(curr);
    }
    return objects;
}

//parse a row by cell, allowing for commas in the data
function splitCSVline(line){
    let splitLine = line.split('","');
    //get rid of double quote at beginning of first word
    splitLine[0] = splitLine[0].substring(1); 

    //get rid of double quote at the end of the last word
    splitLine[splitLine.length - 1] = splitLine[splitLine.length - 1].substring(0, splitLine[splitLine.length - 1].length - 1);
    return splitLine;
}

async function addDefaultCSVToDB(objs){
    //get the existing major data
    const defaultSched = schemas.Majors
    const defaultData = await defaultSched.find({}).exec()

    //through each object from csv
    for(let i = 0; i < objs.length; ++i){
        let obj = objs[i];
        let flag = false;
        
        //loop through each obj in DB
        for(let j = 0; j < defaultData.length; ++j){
            if(obj.name === defaultData[j].name){
                flag = true;

                //check and update variables
                if(obj.credits !== defaultData[j].credits){
                    await defaultSched.updateOne({"name": defaultData[j].name}, {$set: {"credits": obj.credits}});
                }

                if(obj.degreeType !== defaultData[j].degreeType){
                    await defaultSched.updateOne({"name": defaultData[j].name}, {$set: {"degreeType": obj.degreeType}});
                }

                if(obj.required_courses !== defaultData[j].required_courses){
                    await defaultSched.updateOne({"name": defaultData[j].name}, {$set: {"required_courses": obj.required_courses}});
                }
            }
        }

        //new major
        if(!flag){
            console.log(obj);
            await defaultSched.insertOne(obj);
        }

    }
}

//function that adds each object if it is not in the database
async function addCourseCSVToDB(objs){
    //get the existing course data from the DB
    const courses = schemas.Courses
    const courseData = await courses.find({}).exec()

    //through each object from csv
    for(let i = 0; i < objs.length; ++i){
        let flag = false;
        let obj = objs[i];

        //loop through each obj in DB
        for(let j = 0; j < courseData.length; ++j){
            if(obj.id === courseData[j].id){
                flag = true // obj is already in DB

                //check and update variables
                if(obj.name !== courseData[j].name){
                    await courses.updateOne({"id": courseData[j].id}, {$set: {"name": obj.name}});
                }

                if(obj.description !== courseData[j].description){
                    await courses.updateOne({"id": courseData[j].id}, {$set: {"description": obj.description}});
                }

                if(obj.credits !== courseData[j].credits){
                    await courses.updateOne({"id": courseData[j].id}, {$set: {"credits": obj.credits}});
                }

                if(obj.workload !== courseData[j].workload){
                    await courses.updateOne({"id": courseData[j].id}, {$set: {"workload": obj.workload}});
                }

                if(obj.attributes !== courseData[j].attributes){
                    await courses.updateOne({"id": courseData[j].id}, {$set: {"attributes": obj.attributes}});
                }

                if(obj.preReqs !== courseData[j].preReqs){
                    await courses.updateOne({"id": courseData[j].id}, {$set: {"preReqs": obj.preReqs}});
                }

                if(obj.typicalSem !== courseData[j].typicalSem){
                    await courses.updateOne({"id": courseData[j].id}, {$set: {"typicalSem": obj.typicalSem}});
                }
            }
        }
        
        //if it's not in the DB, add it
        if(!flag){
            courses.insertOne(obj);
        }
    }
        
}


//will be needed later if we move the CSV stuff to front end
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