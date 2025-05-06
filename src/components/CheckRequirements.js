import { useContext, useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import AccordionContext from 'react-bootstrap/AccordionContext';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import FakeSemester from './FakeSemester';
import { v4 as uuid } from 'uuid';

const UMBC_BLACK = 'rgb(0, 0, 0)';
const UMBC_GOLD = 'rgb(253, 181, 21)';

function ContextAwareToggle({ children, eventKey, callback, years, countCurrentCredits, majorID}) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey),
  );

  const countCredits = (years) => {
    let totalCredits = 0;
    let mathCredits = 0;
    let WICredits = 0;
    let socialScienceCredits = 0;
    let scienceCredits = 0;
    let englishCredits = 0;
    let languageCredit = 0;
    let AandHCredits = 0;
    let cultureCredits = 0;
    let upperLevelCredits = 0;
    let majorElectiveCredits = 0;
    const allCoursesSet = new Set();

    //console.log("insed of countCredits years is")
    years.forEach((year) => {
      
      year.semesters.forEach((semester) => {
        
        semester.courses.forEach((course) => {
            console.log(course)
          totalCredits += course.credits || 0; // Add the credits of the course to the total
          mathCredits += course.attributes.includes("Math") ? 1 : 0; // Add math credits if the course has the attribute
          WICredits += course.attributes.includes("WI") ? 1 : 0; // Add writing intensive credits if the course has the attribute
          socialScienceCredits += course.attributes.includes("SS") ? 1 : 0; // Add social science credits if the course has the attribute
          scienceCredits += course.attributes.includes("S") ? 1 : 0; // Add science credits if the course has the attribute
          englishCredits += course.attributes.includes("E") ? 1 : 0; // Add English credits if the course has the attribute
          languageCredit += course.attributes.includes("L") ? 1 : 0; // Add language credits if the course has the attribute
          AandHCredits += course.attributes.includes("AH") ? 1 : 0; // Add arts and humanities credits if the course has the attribute
          cultureCredits += course.attributes.includes("C") ? 1 : 0; // Add culture credits if the course has the attribute
          upperLevelCredits += course.attributes.includes("UL") ? course.credits : 0; // Add upper level credits if the course has the attribute
          majorElectiveCredits += course.attributes.includes(`${majorID} ME`) ? 1 : 0; // Add major elective credits if the course has the attribute
          allCoursesSet.add(course.courseID); // Add the course ID to the set of all courses
        })
      })
    })
    console.log(years)

    countCurrentCredits([totalCredits, mathCredits, WICredits, socialScienceCredits, scienceCredits, englishCredits, languageCredit, AandHCredits, cultureCredits, upperLevelCredits, majorElectiveCredits, allCoursesSet]); // Call the function to update current credits
  }

  const handleOnCLick = () => {
    decoratedOnClick();
    countCredits(years);
  }
  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <button
      type="button"
      className="text-umbcBlack font-semibold rounded-lg shadow-md hover:text-umbcGold"
      style={{ height:'65px', width: '125px', backgroundColor: isCurrentEventKey ? UMBC_BLACK : UMBC_GOLD, color: isCurrentEventKey ? UMBC_GOLD : UMBC_BLACK }}
      onClick={handleOnCLick}
    >
      {children}
    </button>
  );
}

function CheckRequirements({showCheck, majorObject, years}) {
  const [courseObjects, setCourseObjects] = useState([]);
  const [missingCourses, setMissingCourses] = useState([]); // Placeholder for missing courses logic
  const[currentCredits, setCurrentCredits] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null]); // Placeholder for credits logic
  const neededCredits = [majorObject.credits, majorObject.mathCount, majorObject.writingIntensive, majorObject.socialSciences, majorObject.sciences, majorObject.english, majorObject.language, majorObject.artsAndHumanities, majorObject.cultureCount, majorObject.upperLevelCredits, majorObject.majorElective, majorObject.coreCourses.length]; // the number of credits needed for 
  
  const updateCurrentCredits = (currentCreditsList) => {
    //console.log("curentCreditsList", currentCreditsList)
    setCurrentCredits(currentCreditsList);

    // get core corses from majorObject and for each check if it is in the all current courses set populated within the countCredits function
    const lastPositon = currentCreditsList.length -1

    const allCoursesSet = currentCreditsList[lastPositon]; // get the set of all courses from the last position of the current credits list
    const coreCourses = majorObject.coreCourses; // get the core courses from the major object
    const missingCoursesList = []; // create a list to hold the missing courses

    coreCourses.forEach((course) => {
      if (!allCoursesSet.has(course)) { // check if the course is not in the set of all courses
        missingCoursesList.push(course) // add the course to the missing courses list
      }
    })
    setMissingCourses(missingCoursesList); // update the missing courses state
    //console.log("missing courses", missingCoursesList) // log the missing courses
    //console.log("all courses", courseObjects) // log the set of all courses
  }

  const axiosFetchCourses = async() =>{ //api call to get data [async = a function that can wait]
    try{
        const res = await axios.get('https://cmsc447-4year-planner-group02.onrender.com/courses') //request data from our backend running on port 4000
        if (res){
            setCourseObjects(res.data) // set the select course array to whatever we got from api call
        }
    } 
    catch(error) {console.error(error)}
  }

  useEffect(() => {  //runs whenever there is a change in the rendering of screen but for our project it only runs once
        let processing = true //used to fix some bug with react
        //CHANGE LATER CHANGE LATER CHANGE LATER
        //             NEED MAJOR BACKEND SUPPORT
        axiosFetchCourses(processing)

        return () => {
            processing = false
        }
    }, []) //lets it know to only run once

  
  
  return (
    <>
    {showCheck &&(
    <Accordion defaultActiveKey="0">
        <Card.Header>
          <ContextAwareToggle eventKey="1" years={years} majorID={majorObject.acronym} countCurrentCredits={updateCurrentCredits}>Verify Major Requirements</ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          
          <Card.Body>
            
            
          <div className="m-1 py-8 px-8 w-full space-y-2 border border-gray-300 bg-white rounded-xl shadow-md sm:py-2 sm:flex sm:items-center sm:space-y-0 sm:gap-x-6">
            <div className="space-y-2 text-center sm:text-left w-full">
                <div className="space-y-0.35">
                    
                      
                  <div className="relative">
                  <p className="text-lg font-semibold text-black text-center ">Major Requirements</p>
                      
                  </div>
                  {currentCredits.length > 0 && (
                    <div className="m-2 border border-gray-300 rounded-xl py-6 px-4 w-full space-y-2 bg-white rounded-xlsm:py-4 sm:flex sm:items-center sm:space-y-0 sm:gap-x-6">
                       
                        <div className="m-2 flex-1 space-y-2 text-center sm:text-left shadow-md bg-stone-100 h-full rounded-xl">
                        <div className="m-2 space-y-0.5 relative">
                        

                            <h1 className="text-lg font-semibold text-black">Status For {majorObject.name}</h1>
                            
                            
                            <p className="flex text-md text-left px-6" style={currentCredits[0] >= neededCredits[0] ?{color: "green"} : {color: "red"}}> Total Credits: {currentCredits[0]} / {neededCredits[0]} </p>

                            <p className="flex text-md text-left px-6" style={currentCredits[1] >= neededCredits[1] ?{color: "green"} : {color: "red"}}> Math Requirement: {currentCredits[1]} / {neededCredits[1]} </p>

                            <p className="flex text-md text-left px-6" style={currentCredits[2] >= neededCredits[2] ?{color: "green"} : {color: "red"}}> Writing Intensive Requirement: {currentCredits[2]} / {neededCredits[2]}</p>

                            <p className="flex text-md text-left px-6" style={currentCredits[3] >= neededCredits[3] ?{color: "green"} : {color: "red"}}> Social Science Requirement: {currentCredits[3]} / {neededCredits[3]}</p>

                            <p className="flex text-md text-left px-6" style={currentCredits[4] >= neededCredits[4] ?{color: "green"} : {color: "red"}}> Science Requirement: {currentCredits[4]} / {neededCredits[4]}</p>
 
                            <p className="flex text-md text-left px-6" style={currentCredits[5] >= neededCredits[5] ?{color: "green"} : {color: "red"}}> English Requirement: {currentCredits[5]} / {neededCredits[5]}</p>

                            <p className="flex text-md text-left px-6" style={currentCredits[6] >= neededCredits[6] ?{color: "green"} : {color: "red"}}> Language Requirement: {currentCredits[6]} / {neededCredits[6]}</p>

                            <p className="flex text-md text-left px-6" style={currentCredits[7] >= neededCredits[7] ?{color: "green"} : {color: "red"}}> Arts and Humanity Requirement: {currentCredits[7]} / {neededCredits[7]}</p>

                            <p className="flex text-md text-left px-6" style={currentCredits[8] >= neededCredits[8] ?{color: "green"} : {color: "red"}}> Culture Credit Requirement: {currentCredits[8]} / {neededCredits[8]}</p>

                            <p className="flex text-md text-left px-6" style={currentCredits[9] >= neededCredits[9] ?{color: "green"} : {color: "red"}}> Upper Level Credits: {currentCredits[9]} / {neededCredits[9]}</p>

                            <p className="flex text-md text-left px-6" style={currentCredits[10] >= neededCredits[10] ?{color: "green"} : {color: "red"}}> Major Elective Requirement: {currentCredits[10]} / {neededCredits[10]}</p>

                            <p className="flex text-md text-left px-6" style={neededCredits[11] - missingCourses.length === neededCredits[11] ?{color: "green"} : {color: "red"}}> Core Courses: {neededCredits[11] - missingCourses.length} / {neededCredits[11]}</p>

                            <p className="flex text-md text-left px-6"> {missingCourses.join(", ")}</p>
                            


                        
                        </div>
                        </div>
                        {missingCourses.length > 0 && (
                          <div className="m-2 flex-1 space-y-2 text-center sm:text-left shadow-md bg-stone-100 h-full rounded-xl">
                          
                          {/* Add the course year here */}
                          <div className="m-2 space-y-0.5">
                              <div className="relative">

                                   {/*Basically, make a false semester object with no functionality displaying DRAGGABLE courses*/ }                       
                                   <FakeSemester
                                      courses={courseObjects
                                        .filter(courseObj => {

                                              return missingCourses.some(neededID => neededID === courseObj.id)

                                            }
                                        )
                                            .map(
                                                (course => ({
                                                    name: course.name,
                                                    courseID: course.id,
                                                    key: uuid(),
                                                    credits: course.credits || 0,
                                                    workload: course.workload || 0,
                                                    typicalSem: course.typicalSem || [],
                                                    attributes: course.attributes || [],
                                                    semesterName: "",
                                                    yearName: "",
                                                })))
                                        }                            
                                                                  
                                       />

                               </div>
                          </div>

                          </div>
                          )}
                        
                  </div>
                  )}
                      
                    
                </div>
            </div>
        </div>
            
            
          </Card.Body>
        </Accordion.Collapse>
    </Accordion>
  )}
  </>                   
  );
}

export default CheckRequirements;
