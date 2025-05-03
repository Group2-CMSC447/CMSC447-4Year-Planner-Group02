import Course from './Course';
import EditCourse from './EditCourse';
import { v4 as uuid } from "uuid";
import { useState, useEffect } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
function Semester(props) {
    //Promote prop details to variables
    const {name, courses } = props;
    const [credits, setCredits] = useState(0);
    const [difficulty, setDifficulty] = useState(0);
    const { min, max } = props.GetCreditRange();
    const outsideCreditRange = credits < min || credits > max;
    const difficultyForWarning = 10;
    const greaterThanDifficulty = difficulty >= difficultyForWarning;
    
    const addCourse = (newCourse, ID, credits, workloadAmt, semesters, attributes) => { //newcourses is a prop sent to editCourses and it comes back witht e selected course name 
        
        // get whats in courses and add a new course to it and the number of courses
        const newCourses = [...courses, {
            name: newCourse, courseID: ID, key: uuid(),
            prevCourses: props.prevCourses, GetSemesterCourses: props.GetSemesterCourses,
            credits: credits, workload: workloadAmt, typicalSem: semesters, attributes: attributes
        }];
        //CALLBACK FUNCTION
        props.updateSemester({ name: props.name, courses: newCourses, preUMBC: props.preUMBC  });
    }

    //Always make the credits value the combination of all the credits of the course objects
    useEffect(() => {
        //basically, go through each course and add the credit value if there is one
        const total = courses.reduce((sum, course) => sum + (course.credits || 0), 0);
        setCredits(total);
    }, [courses]);

    useEffect(() => {
        //basically, go through each course and add the credit value if there is one
        const total = courses.reduce((sum, course) => sum + (course.workload || 0), 0);
        setDifficulty(total);
    }, [courses]);

    const removeCourse = (index) => {//index is the index in the courses array to remove
        //console.log(index); //test
        const newCourses = courses.filter((_, i) => i !== index); //Use the filter function to take out desired course
        
        //CALLBACK FUNCTION
        props.updateSemester({ name: props.name, courses: newCourses, preUMBC: props.preUMBC });

    }

    //Drag and drop event for handling course objects being dropped onto semesters
    //Implements the swap to semester functionality, effectively copying itself then deleting the old one
    const handleDrop = (e) => {
        e.preventDefault();
        //take the data and insert a new course to the bottom
        const courseName = e.dataTransfer.getData("courseName");
        const fromYear = e.dataTransfer.getData("currYear");
        const fromSem = e.dataTransfer.getData("currSemester");
        const ID = e.dataTransfer.getData("courseID");
        const credits = (Number(e.dataTransfer.getData("courseCredits")));
        const workload = (Number(e.dataTransfer.getData("workload")));
        const typicalSem = e.dataTransfer.getData("typicalSem");
        const attributes = e.dataTransfer.getData("attributes");
        //Only add the course if the drag was successful and not to the same semester
        if (courseName && !((fromYear === props.yearName) && (fromSem===props.name)) ){
            //Add the copy
            addCourse(courseName, ID, credits, workload, typicalSem, attributes);
            //Remove the original
            props.removeFromSemester(fromYear, fromSem, courseName, typicalSem);
        }
    }

    //Apparently this just needs to be here to prevent errors for drag and drop
    const handleDragOver = (e) => {
        e.preventDefault();
    }

    return (

        <div className="m-2 flex-1 space-y-2 text-center sm:text-left shadow-md bg-stone-100 h-full rounded-xl"
            onDrop={handleDrop}
            onDragOver={handleDragOver }
        >
            <div className="m-2 space-y-0.5">
                <div className="relative">
                    <p className="text-lg font-semibold text-black">{name}</p> {/*display semester name */}
                    {
                        //Necessary for hiding the button if pre-umbc year
                        !props.preUMBC && <button
                            className="absolute top-0 right-0 text-right font-semibold  hover:text-umbcRed"
                            onClick={() => props.removeSemester(name)}>
                            X
                        </button>
                    }

                    {/*Show the credit counter with errors if too low*/}
                    
                    {
                        !props.preUMBC && (outsideCreditRange || greaterThanDifficulty ) ? (
                        //only show red text and popups if theres missing prereqs
                        <OverlayTrigger
                            placement="top"
                                overlay={


                                //info to be displayed about missing pre reqs
                                <Tooltip id={`tooltip-${props.name}`}>

                                        {outsideCreditRange && (

                                            <p>The total amount of credits ({credits}) does not fall within the range of ({min}, {max})</p>
                                        )}

                                        {greaterThanDifficulty && (

                                            <p>This semester may prove challenging to some students, consider redistributing your difficult courses</p>
                                        )}
                                </Tooltip>
                            }
                        >
                            <p className="text font-semibold text-umbcRed cursor-help">
                                Credits: {credits}
                            </p>
                        </OverlayTrigger>
                    ) : (
                        <p className="text-center font-semibold">Credits: {credits}</p>
                    )}


                </div>
                        
                <div className="flex flex-col justify-center items-center">

                    {
                        courses.map((course, i) => { //iterates through courses and lists their name
                            return (
                                <Course key={uuid()}
                                    name={course.name}
                                    semesterName={name}
                                    prevCourses={props.prevCourses}
                                    yearName={props.yearName}
                                    preUMBC={props.preUMBC}
                                    remove={() => removeCourse(i)}
                                    GetSemesterCourses={props.GetSemesterCourses}
                                />

                            );
                        })
                    }
                </div>
                
                <EditCourse onConfirm={addCourse} /> {/* call the component which handles listing course options and adding the selected course*/} 
                
            </div>
        </div>

    )
}

export default Semester;