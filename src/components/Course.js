import {useState,useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
function Course(props) {
    // declares local vars to hold course data for display.
    const [courseData ,setCourseData] = useState({
        description:"N/A",
        credits: "N/A",
        workload:"N/A",
        attributes: "N/A",
        preReqs: "N/A"
    })

    //Drag function, collects needed data to pass to semester
    const onDragStart = (e) => {
        //Store all data needed by semester object
        e.dataTransfer.setData("courseName", props.name);
        e.dataTransfer.setData("currSemester", props.semesterName);
        e.dataTransfer.setData("currYear", props.yearName);
        //Drop handling is done in the semester component only
    }
    // Shows modal when details button is clicked, hides when Close button is clicked
    const[show,setShow] = useState(false);
    const closeModal = () => setShow(false);

    // holds course objects that api call returns
    const [selectCourse, setSelectCourse] = useState([]);

    const axiosFetchCourses = async() =>{ //api call to get data [async = a function that can wait]
        try{
            const res = await axios.get('http://localhost:4000/courses') //request data from our backend running on port 4000
            if (res){
                setSelectCourse(res.data) // set the select course array to whatever we got from api call
            }
        } 
        catch(error) {console.error(error)}
    }

    // calls function to get data for course which will
    const openModal = () => {
        axiosFetchCourses() //function call to get actuall data from api
    }

    // waits for api to populate course array
    const findCourse = () => {
        // if course not empty, finds desired course, gets details
        if(selectCourse){
            try{
                let currCourse = selectCourse.find(item => item.name === props.name);
               
                // sets variables to be printed within the modal
                setCourseData({
                    description: currCourse.description,
                    credits: currCourse.credits,
                    workload: currCourse.workload,
                    attributes: currCourse.attributes,
                    preReqs: currCourse.preReqs
                })
            
                // only shows modal if data exists
                setShow(true);
            }
            // prints an error if course is not found in db
            catch(error) {console.log("not found")}
        }
    }

    // UseEffect to run findCourse when selectCourse updates
    useEffect(() => {
        if (selectCourse.length > 0) {
            findCourse(); // Only runs when selectCourse has data
        }
    }, [selectCourse]); // Runs every time selectCourse updates

    return (
        <div className="relative bg-white border border-gray-300 rounded-lg shadow-md space-y-2  flex-grow w-full max-h-sm"
            //Needed for drag and drop functionality
            draggable
            onDragStart={ onDragStart}
        >
            <p className="text- font-semibold">{props.name}</p>
            {/* remove button for courses */}
            <button className= "absolute top-0 right-0 text-right font-semibold hover:text-red-600"
                onClick= {props.remove}
            > 
                 X
            </button>
            {/*course details button. Opens details modal when clicked*/}
            <button className = "relative bottom-7 text-decoration: underline text-blue-600 text-right font-semibold hover:text-black"
                 onClick = {openModal}
            >
                details 
            </button>
            {/* course details modal*/}
            <Modal
                show={show}
                onHide={closeModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>{props.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {/*course details goes here*/}
                    <div className = "flex flex-col gap-2 justify-center items-left ">
                        {courseData.description}
                        <p className= "flex">Credits: {courseData.credits}</p>
                        <p className= "flex">Workload: {courseData.workload}</p>
                        <p className= "flex">Attributes: {courseData.attributes}</p>
                        <p className= "flex">Prerequisites: {courseData.preReqs}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
        
    );
}

export default Course;