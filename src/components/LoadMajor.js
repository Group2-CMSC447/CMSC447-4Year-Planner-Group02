// import { useState, useEffect } from 'react';
// import axios from 'axios';

// function LoadMajor({updateDefaultMajorYear, selectedReset, value}){
//     const [majorList, setMajorList] = useState([])
//     const majorYears = [
//         { name: "Before UMBC", preUMBC: true, semesters: [{ name: "Test Credit", courses: []}, { name: "Transfer Credit", courses: [] }] },
//         { name: "Year 1", preUMBC: false, semesters: [{ name: "Fall", courses: [] }, { name: "Spring", courses: [] }] },
//         { name: "Year 2", preUMBC: false, semesters: [{ name: "Fall", courses: [] }, { name: "Spring", courses: [] }] },
//         { name: "Year 3", preUMBC: false, semesters: [{ name: "Fall", courses: [] }, { name: "Spring", courses: [] }] },
//         { name: "Year 4", preUMBC: false, semesters: [{ name: "Fall", courses: [] }, { name: "Spring", courses: [] }] },
//     ];
//     // const [majorYears, setMajorYears] = useState([
//     //     { name: "Before UMBC", preUMBC: true, semesters: [{ name: "Test Credit", courses: []}, { name: "Transfer Credit", courses: [] }] },
//     //     { name: "Year 1", preUMBC: false, semesters: [{ name: "Fall", courses: [] }, { name: "Spring", courses: [] }] },
//     //     { name: "Year 2", preUMBC: false, semesters: [{ name: "Fall", courses: [] }, { name: "Spring", courses: [] }] },
//     //     { name: "Year 3", preUMBC: false, semesters: [{ name: "Fall", courses: [] }, { name: "Spring", courses: [] }] },
//     //     { name: "Year 4", preUMBC: false, semesters: [{ name: "Fall", courses: [] }, { name: "Spring", courses: [] }] },
//     // ]);

    

//     useEffect(() => {  //runs whenever there is a change in the rendering of screen but for our project it only runs once
//         let processing = true //used to fix some bug with react
//         console.log("before axios fetch")
//         axiosFetchMajors(processing)
//         console.log("after axios fetch")
//         return () => {
//             processing = false
//         }
//     }, []) //lets it know to only run once

//     // get the major requirements
//     const axiosFetchMajors = async (processing) => { //api call to get data [async = a function that can wait]
//         try {
//             const res = await axios.get('http://localhost:4000/majors') //request data from our backend running on port 4000
//             if (processing) {
//                 setMajorList(res.data) // set the select course array to whatever we got from api call
//             }
            
//         }
//         catch (error) { console.error(error) }
//     }


//     const iterateMajorCourses = (majorObjects) => {
//         console.log("inside of iterate Major Courses")
//         const selectedMajor = majorObjects.find(major => major.name === value);
//         const listOfMajorReqCourses = selectedMajor.required_courses;
//         for (let i = 0; i < listOfMajorReqCourses.length; i++){
//             const {course, defaultLocation} = listOfMajorReqCourses[i];
//             for (let j = 0; j < majorYears.length; j++){
//                 if (majorYears[j].name === "Year 1" && defaultLocation[0] === "Y1"){
//                     if (defaultLocation[1] === "S1"){
//                         majorYears[j].semesters[0].courses.push(course)
//                     }
//                     else if (defaultLocation[1] === "S2"){
//                         majorYears[j].semesters[1].courses.push(course)
//                     }
//                 }
//                 else if (majorYears[j].name === "Year 2" && defaultLocation[0] === "Y2"){
//                     if (defaultLocation[1] === "S1"){
//                         majorYears[j].semesters[0].courses.push(course)
//                     }
//                     else if (defaultLocation[1] === "S2"){
//                         majorYears[j].semesters[1].courses.push(course)
//                     }
//                 }
//                 else if (majorYears[j].name === "Year 3" && defaultLocation[0] === "Y3"){
//                     if (defaultLocation[1] === "S1"){
//                         majorYears[j].semesters[0].courses.push(course)
//                     }
//                     else if (defaultLocation[1] === "S2"){
//                         majorYears[j].semesters[1].courses.push(course)
//                     }
//                 }
//                 else if (majorYears[j].name === "Year 4" && defaultLocation[0] === "Y4"){
//                     if (defaultLocation[1] === "S1"){
//                         majorYears[j].semesters[0].courses.push(course)
//                     }
//                     else if (defaultLocation[1] === "S2"){
//                         majorYears[j].semesters[1].courses.push(course)
//                     }
//                 }
//                 else{
//                     updateDefaultMajorYear(majorYears, selectedReset)
//                 }
//             }
            
//         }
        
//         updateDefaultMajorYear(majorYears, selectedReset)
//     }

//     // pass course to a year
//         // pass to a semester
//             // add to semester and return the semester
//         // return semester to the year
//     // retrn to app.js to set the years 
//     return(
//         <>
//             {console.log("in the jsx of load major")}
//         </>
//     );
        
// }

// export default LoadMajor;