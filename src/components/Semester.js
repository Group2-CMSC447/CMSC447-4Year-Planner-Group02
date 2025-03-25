import Course from './Course';
import EditCourse from './EditCourse';


function Semester(props) {
    //Promote prop details to variables
    const { name, courses } = props;
    
    const addCourse = (newCourse) => { //newcourses is a prop sent to editCourses and it comes back witht e selected course name 
        
        // get whats in courses and add a new course to it and the number of courses
        const newCourses = [...courses, { name: newCourse }];
        //CALLBACK FUNCTION
        props.updateSemester({ name: props.name, courses: newCourses });
    }

    const removeCourse = (index) => {//index is the index in the courses array to remove
        //console.log(index); //test
        const newCourses = courses.filter((_, i) => i !== index); //Use the filter function to take out desired course
        //CALLBACK FUNCTION
        props.updateSemester({ name: props.name, courses: newCourses }); //needed to pass the updates to the screen (year then to app.js)

    }

    //Drag and drop event for handling course objects being dropped onto semesters
    //Implements the swap to semester functionality, effectively copying itself then deleting the old one
    const handleDrop = (e) => {
        e.preventDefault();
        //take the data and insert a new course to the bottom
        const courseName = e.dataTransfer.getData("courseName");
        const fromYear = e.dataTransfer.getData("currYear");
        const fromSem = e.dataTransfer.getData("currSemester");
        //Only add the course if the drag was successful and not to the same semester
        if (courseName && !((fromYear === props.yearName) && (fromSem===props.name)) ){
            //Add the copy
            addCourse(courseName);
            //Remove the original
            props.removeFromSemester(fromYear, fromSem, courseName);
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
                <p className="text-lg font-semibold text-black">{props.name}</p> {/*display semester name */}
                        
                <div className="flex flex-col justify-center items-center">

                    {
                        courses.map((course, i) => { //iterates through courses and lists their name
                            return (
                                <Course key={course.name} name={course.name} semesterName={props.name} yearName={ props.yearName} remove={() => removeCourse(i)}/>

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