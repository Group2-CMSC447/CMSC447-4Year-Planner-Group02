import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

function EditCourse() {
  const [show, setShow] = useState(false);
  const [selectCourse, setSelectCourse] = useState([])
  const [selectValue, setSelectValue] = useState('')

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  useEffect( () => {
    let processing = true
    axiosFetchCourses(processing)
    return () => {
      processing = false
    }
  },[])

  const axiosFetchCourses = async(processing) =>{
    await axios.get('http://localhost:4000/courses')
    .then(res => {
      if (processing){
        setSelectCourse(res.data)
      }
    })
    .catch(err => console.log(err))
  }

  const SelectInSearch = () => {
    //This is a prop created to get all courses from an api then create an option for each
    return(
      <select value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
        {
          selectCourse?.map( (item) => (
            <option value={item.name} key={item.id}> {item.name} </option>
          ))
        }
      </select>
    )
  }

  return (
    <>
          <Button variant="primary" onClick={handleShow} className="shadow-md">
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
          <SelectInSearch /> {/* New Prop we created*/}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditCourse;