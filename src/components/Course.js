import {useState,useEffect,useCallback} from 'react';
import Modal from 'react-bootstrap/Modal';
//import Button from 'react-bootstrap/Button';
import axios from 'axios'

//For tooltip popup for missing prereq courses
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
function Course(props) {
    const [courseID, setCourseID] = useState("NO ID");
    const [credits, setCredits] = useState(0);
    // declares local vars to hold course data for display.
    const [courseData, setCourseData] = useState({
        id: "N/A",
        description:"N/A",
        credits: "N/A",
        workload:"N/A",
        attributes: "N/A",
        preReqs: [],
        coReqs: []
    })

    //Used for determining whether to show tooltip or not
    const [missingPreReqs, setMissingPreReqs] = useState([]);
    const [missingCoReqs, setMissingCoReqs] = useState([]);

    // holds course objects that api call returns
    const [selectCourse, setSelectCourse] = useState([]);
    //Determine if courses are missing that are needed for this class to be taken
    //Must be called when courses are added /removed in the semester before the current one
    const axiosFetchCourses = async() =>{ //api call to get data [async = a function that can wait]
        try{
            const res = await axios.get('http://localhost:4000/courses') //request data from our backend running on port 4000
            if (res){
                setSelectCourse(res.data) // set the select course array to whatever we got from api call
            }
        } 
        catch(error) {console.error(error)}
    }


    //grabs the course's pre reqs as specified by the database
    const fetchPreReqs = useCallback(async (courseName) => {
        try {
            const response = await axios.get(`http://localhost:4000/courses`);
            const courseDetails = response.data;
            //grab the data about this current course
            let currCourse = courseDetails.find(item => item.name === props.name);
            // sets variables to be printed within the modal
            setCourseData({
                id: currCourse.id,
                description: currCourse.description,
                credits: currCourse.credits,
                workload: currCourse.workload,
                attributes: currCourse.attributes,
                preReqs: currCourse.preReqs,
                coReqs: currCourse.coReqs
            })

            //needed for passing back to semester object
            setCourseID(currCourse.id);
            setCredits(currCourse.credits);
            return currCourse.preReqs;
        } catch (error) {
            return [];
        }
    }, [props.name]);

    const fetchCoReqs = useCallback(async (courseName) => {
        try {
            const response = await axios.get(`http://localhost:4000/courses`);
            const courseDetails = response.data;
            //grab the data about this current course
            let currCourse = courseDetails.find(item => item.name === props.name);
            // sets variables to be printed within the modal
            setCourseData({
                id: currCourse.id,
                description: currCourse.description,
                credits: currCourse.credits,
                workload: currCourse.workload,
                attributes: currCourse.attributes,
                preReqs: currCourse.preReqs,
                coReqs: currCourse.coReqs
            })

            //needed for passing back to semester object
            setCourseID(currCourse.id);
            setCredits(currCourse.credits);

            return currCourse.coReqs;
        } catch (error) {
            return [];
        }
    }, [props.name]);

    //function for updating the value of missingPreReqs
    const checkMissingPreReqs = useCallback(async () => {

        //ensure the database is updated on creation

        const preReqs = await fetchPreReqs(props.name);


        //needs to be an empty array if no previous courses
        //prevents errors in array logic below
        //gets all the previous courses from the callback function in App.js 
        const prevCourses = props.prevCourses(props.yearName, props.semesterName) || [];

        //parse the pre reqs to seperate out for conditional or cases for multiple accepted reqs
        //split -> seperates by or/OR
        //other split uses a regex to accept "OR" and "or"
        //trim removes whitespace for each new section
        const parsedPreReqs = preReqs.map(reqSet =>
                reqSet.trim().split(/\s+or\s+/i).map(course => course.trim())
        );

        //look for preReqs in the previous semesters
        //const missing = preReqs.filter(req => !prevCourses.includes(req));
        //for each reqSet, check if any are found in the prev courses
        const missing = parsedPreReqs.filter(reqSet => !reqSet.some(course => prevCourses.includes(course)));

        const missingPrint = missing.map(reqSet => `(${reqSet.join(' OR ')})`);
        //return a list of any course that does not appear in the previous semesters
        return missingPrint;
    }, [fetchPreReqs, props]);

    //function for updating the value of missingPreReqs
    const checkMissingCoReqs = useCallback(async () => {

        //ensure the database is updated on creation
        const coReqList = await fetchCoReqs(props.name);


        //needs to be an empty array if no previous courses
        //prevents errors in array logic below
        //gets all the previous courses from the callback function in App.js 
        const prevCourses = props.prevCourses(props.yearName, props.semesterName) || [];
        const semesterCourses = props.GetSemesterCourses(props.yearName, props.semesterName) || [];
        const allCourses = prevCourses.concat(semesterCourses);

        //parse the pre reqs to seperate out for conditional or cases for multiple accepted reqs
        //split -> seperates by or/OR
        //other split uses a regex to accept "OR" and "or"
        //trim removes whitespace for each new section
        const parsedCoReqs = coReqList.map(reqSet =>
            reqSet.trim().split(/\s+or\s+/i).map(course => course.trim())
        );

        //look for coreqs in all semesters before and current one 
        //const missing = preReqs.filter(req => !prevCourses.includes(req));
        //for each reqSet, check if any are found in the prev courses
        const missing = parsedCoReqs.filter(reqSet => !reqSet.some(course => allCourses.includes(course)));

        const missingPrint = missing.map(reqSet => `(${reqSet.join(' OR ')})`);


        //return a list of any course that does not appear in the previous semesters
        return missingPrint;
    }, [fetchCoReqs, props]);
    
    //needed for updating and checking for pre reqs on changes to the courses in the planner
    useEffect(() => {
        // Update missing prerequisites whenever courseData changes
        const getMissingPreReqs = async () => {
            const missing = await checkMissingPreReqs();
            setMissingPreReqs(missing);
        };

        getMissingPreReqs();
    }, [checkMissingPreReqs]);

    useEffect(() => {
        // Update missing prerequisites whenever courseData changes
        const getMissingCoReqs = async () => {
            const missing = await checkMissingCoReqs();
            setMissingCoReqs(missing);
        };

        getMissingCoReqs();
    }, [checkMissingCoReqs]);

    //Drag function, collects needed data to pass to semester
    const onDragStart = (e) => {
        //Store all data needed by semester object
        e.dataTransfer.setData("courseName", props.name);
        e.dataTransfer.setData("currSemester", props.semesterName);
        e.dataTransfer.setData("currYear", props.yearName);
        e.dataTransfer.setData("courseID", courseID);
        e.dataTransfer.setData("courseCredits", credits);
        //Drop handling is done in the semester component only
    }
    // Shows modal when details button is clicked, hides when Close button is clicked
    const[show,setShow] = useState(false);
    const closeModal = () => setShow(false);

    // calls function to get data for course which will
    const openModal = () => {
        axiosFetchCourses() //function call to get actuall data from api
    }

    

    // waits for api to populate course array
    const findCourse = useCallback(() => { // has to use callBack to ensure react knows function is the same so useEffect doesn't throw a warning
        // if course not empty, finds desired course, gets details
        if(selectCourse){
            try{
                let currCourse = selectCourse.find(item => item.name === props.name);
               
                // sets variables to be printed within the modal
                setCourseData({
                    id: currCourse.id,
                    description: currCourse.description,
                    credits: currCourse.credits,
                    workload: currCourse.workload,
                    attributes: currCourse.attributes,
                    preReqs: currCourse.preReqs,
                    coReqs: currCourse.coReqs
                })
                setCourseID(currCourse.id);
            
                // only shows modal if data exists
                setShow(true);
            }
            // prints an error if course is not found in db
            catch(error) {console.log("not found")}
        }
    },[props.name,selectCourse]);

    // UseEffect to run findCourse when selectCourse updates
    useEffect(() => {
        if (selectCourse.length > 0) {
            findCourse(); // Only runs when selectCourse has data
        }
    }, [selectCourse,findCourse]); // Runs every time selectCourse updates

    return (
        <div className="relative bg-white border border-gray-300 rounded-lg shadow-md space-y-2  flex-grow w-full max-h-sm"
            //Needed for drag and drop functionality
            draggable
            onDragStart={ onDragStart}
        >

            {/*Used for showing the popups for missing prereqs*/}
            {!props.preUMBC &&(missingPreReqs.length > 0 || missingCoReqs.length> 0) ? (
                //only show red text and popups if theres missing prereqs
                <OverlayTrigger
                    placement="top"
                    overlay={


                        //info to be displayed about missing pre reqs
                        <Tooltip id={`tooltip-${props.name}`}>

                            {missingPreReqs.length > 0 && (
                                <div>Missing prerequisite: {missingPreReqs.join(", ")}</div>
                            )}
                            
                            {missingCoReqs.length > 0 && (
                                <div>Missing corequisite: {missingCoReqs.join(", ")}</div>
                            )}
                        </Tooltip>
                    }
                >
                    <p className="text font-semibold text-umbcRed cursor-help">
                        {props.name}
                    </p>
                </OverlayTrigger>
            ) : (
                <p className="text font-semibold">{props.name}</p>
            )}


            {/* remove button for courses */}
            <button className= "absolute top-0 right-0 text-right font-semibold hover:text-umbcRed"
                onClick= {props.remove}
            > 
                 X
            </button>

            {/*course details button. Opens details modal when clicked*/}
            <button className = "relative bottom-7 text-decoration: underline text-umbcTeal text-right font-semibold hover:text-umbcBlack"
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
                <Modal.Header className = "hover:text-umbcRed"closeButton>
                <Modal.Title>{props.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {/*course details goes here*/}
                    <div className = "flex flex-col gap-2 justify-center items-left ">
                        {courseData.description}
                        <p className= "flex">Credits: {courseData.credits}</p>
                        <p className= "flex">Workload: {courseData.workload}</p>
                        <p className= "flex">Attributes: {courseData.attributes}</p>
                        <p className= "flex">Prerequisites: {courseData.preReqs.join(", ")}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <button style = {{height:'40px', width: '60px'}} className="bg-umbcGold text-umbcBlack font-semibold rounded-lg shadow-md hover:bg-umbcBlack hover:text-umbcGold" onClick={closeModal}>Close</button>
                </Modal.Footer>
            </Modal>
        </div>
        
    );
}

export default Course;