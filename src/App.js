import './App.css';
import { useState, useEffect } from "react";
import Year from './components/Year'
import CreditRange from './components/CreditRange'
import MajorDropdown from './components/MajorDropdown'
import axios from 'axios';
import { v4 as uuid } from "uuid";
import flagImage from './images/maryland-flag-header-1280x180-black-768x108.jpg';
//import logoImage from './images/UMBC-primary-logo-CMYK-on-black.png'
import logoImage from './images/test.png'
import CheckRequirements from './components/CheckRequirements'
//import LoadMajor from './components/LoadMajor';


function App() {
    //Basic year setup, organized by Year Name, the semesters (semester name, then courses, (course name))
    const [years, setYears] = useState([
        { name: "Before UMBC", preUMBC: true, semesters: [{ name: "Test Credit", courses: []}, { name: "Transfer Credit", courses: [] }] },
        { name: "Year 1", preUMBC: false, semesters: [{ name: "Fall", courses: [] }, { name: "Spring", courses: [] }] },
        { name: "Year 2", preUMBC: false, semesters: [{ name: "Fall", courses: [] }, { name: "Spring", courses: [] }] },
        { name: "Year 3", preUMBC: false, semesters: [{ name: "Fall", courses: [] }, { name: "Spring", courses: [] }] },
        { name: "Year 4", preUMBC: false, semesters: [{ name: "Fall", courses: [] }, { name: "Spring", courses: [] }] },
    ]);
    //Adds basic empty year object
    const addYear = () => {
        const newYear = years.length;
        setYears([...years, { name: "Year " + newYear, preUMBC: false, semesters: [{ name: "Fall", courses: [] }, { name: "Spring", courses: [] }] }]);
 
    };
    //Use for the credit range checks
    const [min, setMin] = useState(12);
    const [max, setMax] = useState(20);
    //used by the credit range slider
    const changeVals = (value) => {
        console.log("Changed Vals to: " + value[0] + " and " + value[1])
        setMin(value[0]);
        setMax(value[1]);

        /*Console log for preventing errors*/
        console.log("Console log for preventing warnings. Min: " + { min } +" Max:" + { max } )
    };

    const GetCreditRange = () => {
        return { min, max };
    }
    
    const [majorName, setMajorName] = useState("No Major"); //default value for major name
    const [showCheck, setShowCheck] = useState(false); //boolean for showing the check requirements button

    const onConfirmMajor = (value, confirmChoice, majorList, loadDeafult) => {
        //Used for major dropdown and data population
        setMajorName(value);
        // setMajorList(majorList)
        console.log("Major name set to: " + majorName);
        if (loadDeafult) {
            let choiceTest = ""
            confirmChoice ? choiceTest = "Reset" : choiceTest = "maintain"
            console.log("Choice test is: " + choiceTest)
            

            if (confirmChoice) {
                setYears([
                    { name: "Before UMBC", preUMBC: true, semesters: [{ name: "Test Credit", courses: []}, { name: "Transfer Credit", courses: [] }] },
                    { name: "Year 1", preUMBC: false, semesters: [{ name: "Fall", courses: [] }, { name: "Spring", courses: [] }] },
                    { name: "Year 2", preUMBC: false, semesters: [{ name: "Fall", courses: [] }, { name: "Spring", courses: [] }] },
                    { name: "Year 3", preUMBC: false, semesters: [{ name: "Fall", courses: [] }, { name: "Spring", courses: [] }] },
                    { name: "Year 4", preUMBC: false, semesters: [{ name: "Fall", courses: [] }, { name: "Spring", courses: [] }] },
                ])

            } 
            loadMajorCourses(years, value, majorList)
        }
        else{
            if (value !== "No Major"){
                const selectedMajorObject = majorList.find(major => major.name === value);
                
                setMajorObject(selectedMajorObject)
                setShowCheck(true)
            }
            else{
                setShowCheck(false)
            }
        }
    }

    // holds course objects that api call returns
    const [courseObjects, setCourseObjects] = useState([]);
    const [majorObject, setMajorObject] = useState(null);
    //Determine if courses are missing that are needed for this class to be taken
    //Must be called when courses are added /removed in the semester before the current one
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

    const loadMajorCourses = (newYearForMajor, selectedMajorName, majorList) =>{
        
        if (selectedMajorName !== "No Major"){        
            const selectedMajorObject = majorList.find(major => major.name === selectedMajorName);
            console.log("the object selected is", selectedMajorObject)
            setMajorObject(selectedMajorObject)
            const listOfMajorReqCourses = selectedMajorObject.required_courses;
            for (let i = 0; i < listOfMajorReqCourses.length; i++){
                const courseName = Object.keys(listOfMajorReqCourses[i]);
                const defaultLocation = listOfMajorReqCourses[i][courseName[0]]
            
                const course = courseObjects.find(object => object.id === courseName[0])

                addToSemester(defaultLocation[0], defaultLocation[1], course.name, course.id, course.credits, course.workload, course.typicalSem, course.attributes);
            }

            setShowCheck(true)
        }
        else{
            
            setShowCheck(false)
        }
        
    }

    //Long winded callback function used at the semester level for drag and drop cleanup
    //Quite literally restructured the whole code just to implement this function
    const removeFromSemester = (yearName, semesterName, courseName) => {
        setYears((oldYears) =>
            //update current years
            oldYears.map((currYear) => {
                //find the year we are looking for
                if (currYear.name === yearName) {
                    //return a modified version of it
                    return {
                        ...currYear,
                        semesters: currYear.semesters.map((currSem) => {
                            //loop the semester for the corrrect semester
                            if (currSem.name === semesterName) {
                                //take out the course
                                return {
                                    ...currSem,
                                    courses: currSem.courses.filter(
                                        (course) => course.name !== courseName // Remove course by name
                                    ),
                                };
                            }
                            //if not it, return as is
                            return currSem;
                        }),
                    };
                }
                //If not the desired year, dont modify
                return currYear;
            })
        );
    };


    //Long winded callback function used at the semester level for drag and drop cleanup
    //Quite literally restructured the whole code just to implement this function
    const addToSemester = (yearName, semesterName, courseName, ID, credits, workloadAmt, semesters, attributes) => {
        setYears((oldYears) =>
            //update current years
            oldYears.map((currYear) => {
                //find the year we are looking for
                if (currYear.name === yearName) {
                    //return a modified version of it

                    return {
                        ...currYear,
                        semesters: currYear.semesters.map((currSem) => {

                            //loop the semester for the corrrect semester
                            if (currSem.name === semesterName) {
                                //Add course logic
                                const oldCourses = currSem.courses;
                                const newCourses = [...oldCourses, { name: courseName, courseID: ID, key: uuid(), prevCourses: getPrevCourses, credits: credits, workload: workloadAmt, typicalSem: semesters, attributes: attributes}];
                                
                                return {
                                    ...currSem,
                                    courses: newCourses
                                };
                            }

                            //if not it, return as is
                            return currSem;
                        }),
                    };
                }
                //If not the desired year, dont modify
                return currYear;
            })
        );
    };
    //Determine the classes completed prior to the specified semester
    const getPrevCourses = (currYear, currSem) => {
        //return value of all course names
        const completed = [];

        //loop through all semesters in each leading up to desired year and semester
        //add all before the current year
        let yearFlag = false;
        for (let i = 0; i < years.length; i++) {
            const year = years[i];


            if (yearFlag) {
                //exit the loop if its a year after the desired one
                break;
            }
            else if (year.name === currYear) {
                //break when at current year, cant just blind add courses
                yearFlag = true;

                let semFlag = false
                year.semesters.forEach((sem) => {
                    //loop over all semesters in the year, only adding the ones before the current semester
                    if (sem.name !== currSem && !semFlag) {
                        completed.push(...sem.courses.map(course => course.courseID));
                    }
                    else {
                        //if at current semester, break out loop
                        semFlag = true;
                    }
                });
            }
            else {
                //otherwise if year before current, just add all the courses you find
                year.semesters.forEach((sem) => {
                    //loop over all semesters in the year, adding all courses

                    completed.push(...sem.courses.map(course => course.courseID));
                });
            }
        }

        return completed;
    }

    const getSemesterCourses = (currYear, currSem) => {
        //return value of all course names
        const completed = [];

        //loop through all semesters in each leading up to desired year and semester
        //add all before the current year
        let yearFlag = false;
        for (let i = 0; i < years.length; i++) {
            const year = years[i];


            if (yearFlag) {
                //exit the loop if its a year after the desired one
                break;
            }
            else if (year.name === currYear) {
                //break when at current year, cant just blind add courses
                yearFlag = true;

                let semFlag = false
                year.semesters.forEach((sem) => {
                    //loop over all semesters in the year, only adding the ones before the current semester
                    if (sem.name === currSem && !semFlag) {
                        completed.push(...sem.courses.map(course => course.courseID));
                        //if at current semester, break out loop
                        semFlag = true;
                    }
                });
            }
        }

        return completed;
    }

    //callback function used by year components to update their values
    //must be called from year to pass back changes
    //WILL BREAK IF TWO YEARS HAVE THE SAME NAME
    const updateYear = (newYear) => {
        //only update the desired year based on the specified name
        setYears(old =>
            old.map(year =>
                year.name === newYear.name ? newYear : year // Corrected this line
            )
        );
    };

    const removeYear = (yearName) => {
        setYears(newYears => years.filter(
            (year) => year.name !== yearName
        ))
    }
    

    return (
        <div className= "bg-umbcLightGray">
            {/*UMBC banner with logo*/}
            <div className='banner' style={{
                width: '100%',
                height: 'auto', // height of background banned adjusts to size of logoImage
                backgroundImage: `url(${flagImage})`, // MD flag background image
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}>
                <img src={logoImage}alt =""/>
            </div>
            
            <div className="flex flex-col ml-4 mr-4 bg-umbcLightGray" data-testid="callYear">
                <h1 className="text-center text-xl font-semibold">Undergraduate Degree Planner</h1>

                <h3 className="text-left text-lg font-semibold">Planner Options:</h3>
                    <div className="flex justify-left item-center gap-4">

                        <div className="flex flex-col w-1/2">
                            <MajorDropdown onConfirm={onConfirmMajor}></MajorDropdown>
                        
                        </div>
                        
                    </div>
                {showCheck &&
                (
                    
                     <div className="flex-auto">
                    <CheckRequirements
                        showCheck={showCheck}
                        majorObject={majorObject}
                        years={years}
                    />
                    </div>
                )
                }
                <div className="flex-auto">
                        <CreditRange changeVals={changeVals}></CreditRange>
                </div>
            <div>
                {
                    years.map((year, index) => {     
                        return (
                            <Year name={index === 0 ? "Before UMBC" : `Year ${index}`}
                                removeYear={removeYear}
                                preUMBC={year.preUMBC}
                                semesters={year.semesters}
                                removeFromSemester={removeFromSemester}
                                updateYear={updateYear}
                                className="flex-grow w-full"
                                key={year.name}
                                prevCourses={getPrevCourses}
                                GetCreditRange={GetCreditRange}
                                GetSemesterCourses={getSemesterCourses}
                            />

                        );
                    })
                }
                    
            </div>
                
                <button onClick={addYear} className="px-6 py-2 bg-umbcGold  text-umbcBlack font-semibold rounded-lg shadow-md hover:bg-umbcBlack hover:text-umbcGold">
                    Add Empty Year
                </button>
            <a
            className="Github-Link text-center font-semibold"
            href="https://github.com/Group2-CMSC447/CMSC447-4Year-Planner-Group02"
            target="_blank"
            rel="noopener noreferrer"
            >
            Check Our Github
            </a>
            <a
            className="Link text-center font-semibold"
            href="https://docs.google.com/forms/d/e/1FAIpQLSfYgcY6GL_0GiXPl_83X5HK3IzYM4eMkZxksv5kI8GUSUCr8g/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            >
                Give Your Feedback
            </a>

        </div>
    </div>
    
  );
}

export default App;
