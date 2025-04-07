import './App.css';
import { useState } from "react";
import Year from './components/Year'
import CreditRange from './components/CreditRange'
import MajorDropdown from './components/MajorDropdown'
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
    const [min, setMin] = useState();
    const [max, setMax] = useState();
    //used by the credit range slider
    const changeVals = (value) => {
        console.log("Changed Vals to: " + value[0] + " and " + value[1])
        setMin(value[0]);
        setMax(value[1]);

        /*Console log for preventing errors*/
        console.log("Console log for preventing warnings. Min: " + { min } +" Max:" + { max } )
    };


    
    const [majorName, setMajorName] = useState("Hello");
    // const [majorList, setMajorList] = useState([])

    const onConfirmMajor = (value, confirmChoice, majorList) => {
        //Used for major dropdown and data population
        setMajorName(value);
        // setMajorList(majorList)
        console.log("Major name set to: " + majorName);
        let choiceTest = ""
        confirmChoice ? choiceTest = "Reset" : choiceTest = "maintain"
        console.log("The Choice is:", choiceTest )

        //confirmChoice ? resetSchedule(value) : addToSchedule(value)

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

    const loadMajorCourses = (newYearForMajor, selectedMajorName, majorList) =>{
        console.log("inside of load Major Courses")        
        const selectedMajorObject = majorList.find(major => major.name === selectedMajorName);
        console.log("the found major is:", selectedMajorName, "the object selected is", selectedMajorObject.name)
        const listOfMajorReqCourses = selectedMajorObject.required_courses;
        for (let i = 0; i < listOfMajorReqCourses.length; i++){
            console.log("Iteration:", i, "the list for major is: ", listOfMajorReqCourses[i])
            console.log("testing testing")
            const course = Object.keys(listOfMajorReqCourses[i]);
            console.log("course is: ", course[0])
            const defaultLocation = listOfMajorReqCourses[i][course[0]]
            console.log("the list of year and semester is:", defaultLocation)
            for (let j = 0; j < newYearForMajor.length; j++){
                if (newYearForMajor[j].name === "Year 1" && defaultLocation[0] === "Y1"){
                    if (defaultLocation[1] === "S1"){
                        newYearForMajor[j].semesters[0].courses.push(course[0])
                        console.log("the new semester is:", newYearForMajor[j])
                    }
                    else if (defaultLocation[1] === "S2"){
                        newYearForMajor[j].semesters[1].courses.push(course[0])
                        
                    }
                }
                else if (newYearForMajor[j].name === "Year 2" && defaultLocation[0] === "Y2"){
                    if (defaultLocation[1] === "S1"){
                        newYearForMajor[j].semesters[0].courses.push(course[0])
                    }
                    else if (defaultLocation[1] === "S2"){
                        newYearForMajor[j].semesters[1].courses.push(course[0])
                    }
                }
                else if (newYearForMajor[j].name === "Year 3" && defaultLocation[0] === "Y3"){
                    if (defaultLocation[1] === "S1"){
                        newYearForMajor[j].semesters[0].courses.push(course[0])
                    }
                    else if (defaultLocation[1] === "S2"){
                        newYearForMajor[j].semesters[1].courses.push(course[0])
                    }
                }
                else if (newYearForMajor[j].name === "Year 4" && defaultLocation[0] === "Y4"){
                    if (defaultLocation[1] === "S1"){
                        newYearForMajor[j].semesters[0].courses.push(course[0])
                    }
                    else if (defaultLocation[1] === "S2"){
                        newYearForMajor[j].semesters[1].courses.push(course[0])
                        
                    }
                }
            }
        }
        setYears(newYearForMajor)

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
        <div className="flex flex-col ml-4 mr-4" data-testid="callYear">

            <h1 className="text-center text-xl font-semibold">4 Year Plan</h1>

            <h3 className="text-left text-lg font-semibold">Planner Options:</h3>
                <div className="flex justify-center item-center gap-4">
                    <div className="">
                           <MajorDropdown onConfirm={onConfirmMajor}></MajorDropdown>
                    </div>
                

                    <div className="flex-auto">
                            <CreditRange changeVals={changeVals}></CreditRange>
                    </div>
                </div>
          {
              //This displays all the year objects stored in the years array
          }
          <div className="flex flex-col justify-center items-center min-h-screen" key="year">
          
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
                          />

                      );
                  })
                }
                
          </div>
            
            <button onClick={addYear} className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
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
    </div>
    
  );
}

export default App;
