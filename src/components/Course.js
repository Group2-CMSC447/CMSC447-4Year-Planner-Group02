function Course(props) {
    return (
        <div className="bg-white border border-gray-300 rounded-sm shadow-md space-y-2  flex-grow w-full max-h-sm">
            <p className="text- font-semibold">{props.name}</p>
        </div>
    );
}

export default Course;