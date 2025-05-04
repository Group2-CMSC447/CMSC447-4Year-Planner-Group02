import { useState, useEffect } from 'react';
import FakeCourse from './FakeCourse';
import { v4 as uuid } from 'uuid';
function FakeCourseContainer(props) {
    const [courses, setCourses] = useState(props.courses || []); //will be passed by the checkRequirements creation step

    useEffect(() => {
        setCourses(props.courses); // Ensure it resets when the courses prop changes
    }, [props.courses]); 

    return (
        <div>
            <p className="text-lg font-semibold text-black text-center "> Missing Courses</p>
            <div>

                {/* share the same data a regular course would have in a normal semester
                    makes it look like a regular semester without all the functionality    
                */}
                {courses.map(course => (
                    <FakeCourse
                        key={uuid()}
                        courseID={course.courseID}
                        credits={course.credits}
                        workload={course.workload}
                        typicalSem={course.typicalSem}
                        name={course.name}
                        semesterName={course.semesterName}
                        yearName={course.yearName}
                    />
                ))}
            </div>
        </div>
    );
}

export default FakeCourseContainer;