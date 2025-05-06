import { useState } from 'react';

//a course object with no functionality. used for major requirements displaying
function FakeCourse(props) {
    const [courseID, setCourseID] = useState(props.courseID);
    const [credits, setCredits] = useState(props.credits);
    const [workload, setWorkload] = useState(props.workload);
    const [typicalSem, setTypicalSem] = useState(props.typicalSem);

    // Drag function to collect needed data to pass to the semester
    const onDragStart = (e) => {
        // Store all data needed by semester object just like regular course, semester will see the data coming in as a real course
        e.dataTransfer.setData("courseName", props.name);
        e.dataTransfer.setData("currSemester", props.semesterName);
        e.dataTransfer.setData("currYear", props.yearName);
        e.dataTransfer.setData("courseID", courseID);
        e.dataTransfer.setData("courseCredits", credits);
        e.dataTransfer.setData("workload", workload);
        e.dataTransfer.setData("typicalSem", typicalSem);

        // Drop handling is done in the semester component only
        setCourseID(props.courseID);
        setCredits(props.credits);
        setTypicalSem(props.typicalSem);
        setWorkload(props.workload);
    };

    return (
        //default course visual setup with drag support
        <div
            className="relative bg-white border border-gray-300 rounded-lg shadow-md space-y-2 flex-grow w-full max-h-sm"
            draggable
            onDragStart={onDragStart}
        >
            <p className="text font-semibold">{props.name}</p>

        </div>
    );
}

export default FakeCourse;