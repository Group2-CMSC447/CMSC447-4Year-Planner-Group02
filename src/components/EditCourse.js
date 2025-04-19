import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function EditCourse({onConfirm}) { //Takes a prop from semester which is an on confirm event that calls add course
  const [show, setShow] = useState(false); //for the model
  const [selectCourse, setSelectCourse] = useState([]) //collect course options from database
  const [selectedCourse, setSelectedCourse] = useState(null) //get the selected course, need the whole course for returning the name and course id
  const [selectDepartment, setSelectDepartment] = useState([]) //collect course options from database
  const [selectedDepartment, setSelectedDepartment] = useState(null)
  const [departmentFilter, setDepartmentFilter] = useState("")

  const handleClose = () => setShow(false); //when model has to close set show to false
  const handleShow = () => setShow(true); //when model has to open set show to true
  const handleConfirm = () => { //runs after clicking add in the modal
      if (selectedCourse) { //ensures a course was actually clicked
          onConfirm(selectedCourse.name, selectedCourse.id, selectedCourse.credits); //uses the passed prop from semester to send the selected value to a function called add course which gets the selected value as a prop newCourse
      //console.log(selectedValue); //test
      //setSelectedValue(''); //reset the selected value
      handleClose(); //closes the modal just like when you cancel
    }
  }

  
  useEffect( () => {  //runs whenever there is a change in the rendering of screen but for our project it only runs once
    let processing1 = true //used to fix some bug with react
    let processing2 = true
    axiosFetchCourses(processing1) //function call to get actuall data from api
    axiosFetchDepartments(processing2)
    return () => {
      processing1 = false
      processing2 = false
    }
  },[]) //lets it know to only run once

  const axiosFetchCourses = async(processing) =>{ //api call to get data [async = a function that can wait]
    try{
        const res = await axios.get('https://cmsc447-4year-planner-group02.onrender.com/courses') //request data from our backend running on port 4000
        if (processing){
          setSelectCourse(res.data) // set the select course array to whatever we got from api call
        }
      } 
    catch(error) {console.error(error)}
  }

  const axiosFetchDepartments = async(processing) =>{ //api call to get data [async = a function that can wait]
    try{
        const res = await axios.get('https://cmsc447-4year-planner-group02.onrender.com/departments') //request data from our backend running on port 4000
        if (processing){
          setSelectDepartment(res.data) // set the select course array to whatever we got from api call
        }
      } 
    catch(error) {console.error(error)}
  }
    
  

  // const axiosFetchCourses = async(processing) =>{ //api call to get data [async = a function that can wait]
  //   await axios.get('http://localhost:4000/courses') //request data from our backend running on port 4000
  //   .then(res => {
  //     if (processing){
  //       setSelectCourse(res.data) // set the select course array to whatever we got from api call
  //     }
  //   })
  //   .catch(err => console.log(err))
  // }

  const SelectInSearch = (department) => {
    //This is a prop created to get all courses from an api then create an option for each
    console.log("inside of course list", department.department)
    if (department.department !== null){
        setDepartmentFilter(department.department.name)
      }
      console.log("checks if string starts with", departmentFilter)
      const filteredCourses = selectCourse.filter((item) => (item.name.startsWith(departmentFilter)));
      console.log(filteredCourses)
      return (
          //Must return entire course to access the id and name!
        //course is extracted by its ID in the on change function using the id from the course selected in the dropdown
        
        
      
          <select value={selectedCourse?.id || ''}
              onChange={(e) => {
                   const course = selectCourse.find(c => c.id === e.target.value)
                   setSelectedCourse(course)

               }}> {/* the value for the select gets set once the option is picked*/}

              {/*Default Option*/}
              {/*spread out the options from the large course database, display courses one at a time*/}
              <option value="" disabled>Select a course</option>{
                  filteredCourses?.map((item) => (
                      <option value={item.id} key={item.id}> {item.name}</option>
                  ))
              }
        
          </select>
    )
  }

  const DepartmentSearch = () => {
    return (
      <select value={selectedDepartment?.name || ''}
        onChange={(e) => {
            const department = selectDepartment.find(c => c.name === e.target.value)
            setSelectedDepartment(department)
            console.log("The selected department is ", selectedDepartment)

        }}> {/* the value for the select gets set once the option is picked*/}

        {/*Default Option*/}
        {/*spread out the options from the large course database, display courses one at a time*/}
        <option value="" disabled>Select a department</option>{
            selectDepartment?.map((item) => (
                <option value={item.name} key={item.name}> {item.name}</option>
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
          <DepartmentSearch />
          <SelectInSearch department={selectedDepartment}/> {/* New Prop we created this is what gets the data from the database and lists the course objects fromt he data recieved from the database*/} 

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