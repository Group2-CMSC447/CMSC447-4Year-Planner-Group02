import './App.css';
import { useState } from "react";
import Year from './components/Year'
import CreditRange from './components/CreditRange'
import MajorDropdown from './components/MajorDropdown'

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
        const newYear = years.length + 1;
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

    //Used for major dropdown and data population
    const [majorName, setMajorName] = useState("Hello");

    const onConfirmMajor = (value) => {
        setMajorName(value);
        console.log("Major name set to: " + majorName);

        //IMPLEMENT LOGIC FOR POPULATING BASIC 4YEAR PLAN HERE
        //
        //
        //
        //
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
                          <Year name = {index === 0 ? "Before UMBC" : `Year ${index}`} 
                              removeYear={removeYear }
                              preUMBC={year.preUMBC}
                              semesters={year.semesters}
                              removeFromSemester={removeFromSemester}
                              updateYear={updateYear}
                              className="flex-grow w-full"
                              key={year.name}
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
