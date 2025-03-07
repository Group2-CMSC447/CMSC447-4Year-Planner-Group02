import Course from './Course';
import EditCourse from './EditCourse';
import { useState} from "react";


function Semester(props) {
    const [courses, setCourses] = useState([]); //create an empty array and use setCourses to change it
    
    const addCourse = (newCourse) => { //newcourses is a prop sent to editCourses and it comes back witht e selected course name 
        const newCourseNum = courses.length + 1; // get the number of courses and add 1
        console.log(courses) //test
        console.log(newCourse) // test
        setCourses([ ...courses, {name: newCourse + newCourseNum}]); // get whats in courses and add a new course to it and the number of courses
    }
        

    return (

        <div className="m-2 flex-1 space-y-2 text-center sm:text-left shadow-md bg-stone-100 h-full rounded-xl">
            <div className="m-2 space-y-0.5">
                <p className="text-lg font-semibold text-black">{props.name}</p> {/*display semester name */}
                        
                <div className="flex flex-col justify-center items-center">

                    {
                        courses.map((course) => { //iterates through courses and lists their name
                            return (
                                <Course name={course.name}/>

                            );
                        })
                    }
                </div>
                
                <EditCourse onConfirm={addCourse}/> {/* call the component which handles listing course options and adding the selected course*/} 

            </div>
        </div>

    )
}

export default Semester;