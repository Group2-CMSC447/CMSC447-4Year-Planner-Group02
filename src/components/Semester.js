import Course from './Course';
import EditCourse from './EditCourse';
import { useState } from "react";
import Button from 'react-bootstrap/Button';
function Semester(props) {
    const [courses, setCourses] = useState([
    ]);

    const addCourse = () => {
        const newCourseNum = courses.length + 1;
        setCourses([...courses, { name: 'New Class #' + newCourseNum }]);

    };

    return (

        <div className="m-2 flex-1 space-y-2 text-center sm:text-left shadow-md bg-stone-100 h-full rounded-xl">
            <div className="m-2 space-y-0.5">
                <p className="text-lg font-semibold text-black">{props.name}</p>
                        {/* <button class="border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 ...">
                        Add Course
                        </button> */}
                <div className="flex flex-col justify-center items-center">

                    {
                        courses.map((course) => {
                            return (
                                <Course name={course.name}/>

                            );
                        })
                    }
                </div>
                <Button onClick={ addCourse} variant="primary">
                    Add Blank
                </Button>
                <EditCourse />
                </div>
        </div>

    )
}

export default Semester;