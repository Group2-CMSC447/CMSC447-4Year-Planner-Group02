function Course(props) {

    //Drag function, collects needed data to pass to semester
    const onDragStart = (e) => {
        //Store all data needed by semester object
        e.dataTransfer.setData("courseName", props.name);
        e.dataTransfer.setData("currSemester", props.semesterName);
        e.dataTransfer.setData("currYear", props.yearName);
        //Drop handling is done in the semester component only
    }

    return (
        <div className="relative bg-white border border-gray-300 rounded-lg shadow-md space-y-2  flex-grow w-full max-h-sm"
            //Needed for drag and drop functionality
            draggable
            onDragStart={ onDragStart}
        >
            <p className="text- font-semibold">{props.name}</p>
            <button className= "absolute top-0 right-0 text-right font-semibold hover:text-red-600"
                 onClick= {props.remove}> 
                 X
            </button>
        </div>
    );
}

export default Course;