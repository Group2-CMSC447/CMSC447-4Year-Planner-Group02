import { useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
function Course(props) {

    //Drag function, collects needed data to pass to semester
    const onDragStart = (e) => {
        //Store all data needed by semester object
        e.dataTransfer.setData("courseName", props.name);
        e.dataTransfer.setData("currSemester", props.semesterName);
        e.dataTransfer.setData("currYear", props.yearName);
        //Drop handling is done in the semester component only
    }
    // Shows modal when details is clicked, hides when Close is clicked
    const[show,setShow] = useState(false);
    const closeModal = () => setShow(false);
    const openModal = () => setShow(true);
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
            <button className = "text-decoration: underline text-blue-600 text-right font-semibold hover:text-black"
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

                    {/*description goes here*/}
                    pull details from database for course based on props name

                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
        
    );
}

export default Course;