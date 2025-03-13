
// remove course handler just prints clicked for now
function removeCourse()
{
    console.log("Remove Course Clicked")
}

function Course(props) {
    return (
        <div className="relative bg-white border border-gray-300 rounded-sm shadow-md space-y-2  flex-grow w-full max-h-sm">
            <p className="text- font-semibold">{props.name}</p>
            <button className= "absolute top-0 right-0 bg-gray-100 text- font-semibold border border border-gray-300 rounded-sm shadow-md hover:text-red-600"
                 onClick= {removeCourse}>
                 X
            </button>
        </div>
    );
}

export default Course;