import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function EditCourse({onConfirm}) { //Takes a prop from semester which is an on confirm event that calls add course
  const [show, setShow] = useState(false); //for the model
  const [selectCourse, setSelectCourse] = useState([]) //collect course options from database
  const [selectedValue, setSelectedValue] = useState('') //get the selected course


  const handleClose = () => setShow(false); //when model has to close set show to false
  const handleShow = () => setShow(true); //when model has to open set show to true
  const handleConfirm = () => { //runs after clicking add in the modal
    if(selectedValue){ //ensures a course was actually clicked
      onConfirm(selectedValue); //uses the passed prop from semester to send the selected value to a function called add course which gets the selected value as a prop newCourse
      //console.log(selectedValue); //test
      //setSelectedValue(''); //reset the selected value
      handleClose(); //closes the modal just like when you cancel
    }
  }

  
  useEffect( () => {  //runs whenever there is a change in the rendering of screen but for our project it only runs once
    let processing = true //used to fix some bug with react
    axiosFetchCourses(processing) //function call to get actuall data from api
    return () => {
      processing = false
    }
  },[]) //lets it know to only run once

  const axiosFetchCourses = async(processing) =>{ //api call to get data [async = a function that can wait]
    await axios.get('http://localhost:4000/courses') //request data from our backend running on port 4000
    .then(res => {
      if (processing){
        setSelectCourse(res.data) // set the select course array to whatever we got from api call
      }
    })
    //.catch(err => console.log(err))
  }

  const SelectInSearch = () => {
    //This is a prop created to get all courses from an api then create an option for each
    return(
      <select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}> {/* the value for the select gets set once the option is picked*/}
        {
          selectCourse?.map( (item) => ( //The map function iterates through the array selectCourse as long as there is something in there
            <option value={item.name} key={item.id}> {item.name} </option> //displays options by the courses.name, the value of the object is the objects.name and is passed to the value of selectedValue so it only has the string value
          ))
        }
      </select>
    )
  }

  return (
    <>
          <Button variant="primary" onClick={handleShow} className="shadow-md"> {/* add course button that shows modal on click */}
        Add Course
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <SelectInSearch /> {/* New Prop we created this is what gets the data from the database and lists the course objects fromt he data recieved from the database*/} 

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>Add</Button> {/* when clicked run handle confirm which will return the selected value to the semester prop */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditCourse;