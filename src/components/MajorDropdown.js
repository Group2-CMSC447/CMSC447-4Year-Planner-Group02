import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MajorDropdown({ onConfirm }) { //Takes a prop from semester which is an on confirm event that calls add course
    const [selectMajor, setSelectMajor] = useState([]) //collect course options from database
    const [selectedValue, setSelectedValue] = useState("") //get the selected course
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleCloseModal = () => {
        onConfirm(selectedValue, false, selectMajor, false) //if no course is selected then just pass the selected value as is
        setIsModalOpen(false); //when model has to close set show to false
    }
    const handleReset = () => {
        setIsModalOpen(false)
        onConfirm(selectedValue, true, selectMajor, true)
    }
    const handleLeaveAsIs = () => {
        setIsModalOpen(false)
        
        //choice? console.log("True") : console.log("false")
        onConfirm(selectedValue, false, selectMajor, true)
    }

    useEffect(() => {
      }, [selectedValue]);

    const handleConfirm = (e) => { //runs after clicking add in the modal
        if (e.target.value) { //ensures a course was actually clicked
            if (e.target.value !== "No Major") { //ensures a course was actually clicked
            setSelectedValue(e.target.value)
            setIsModalOpen(true)
            }
            else{
                setSelectedValue(e.target.value)
                onConfirm("No Major", false, []) //if no course is selected then just pass the selected value as is
            }
        }
    }

    useEffect(() => {  //runs whenever there is a change in the rendering of screen but for our project it only runs once
        let processing = true //used to fix some bug with react


        //CHANGE LATER CHANGE LATER CHANGE LATER
        //             NEED MAJOR BACKEND SUPPORT
        axiosFetchMajors(processing)

        return () => {
            processing = false
        }
    }, []) //lets it know to only run once

    //REPLACE WITH MAJOR NAME FUNCTION CALL
    //CHANGE LATER CHANGE LATER CHANGE LATER
    //             NEED MAJOR BACKEND SUPPORT
    const axiosFetchMajors = async (processing) => { //api call to get data [async = a function that can wait]
        try {
            const res = await axios.get('https://cmsc447-4year-planner-group02.onrender.com/majors') //request data from our backend running on port 4000
            if (processing) {
                setSelectMajor(res.data) // set the select course array to whatever we got from api call
            }
        }
        catch (error) { console.error(error) }
    }

    const SelectInSearch = () => {
        //This is a prop created to get all courses from an api then create an option for each
        return (
            <select value={selectedValue} onChange={(e) => handleConfirm(e)}> {/* the value for the select gets set once the option is picked*/}
                <option value="No Major" >No Major</option> {/* default option*/}
                {
                    selectMajor?.map((item) => ( //The map function iterates through the array selectCourse as long as there is something in there
                        <option value={item.name}> {item.name} </option> //displays options by the courses.name, the value of the object is the objects.name and is passed to the value of selectedValue so it only has the string value
                    ))
                }
            </select>
        )
    }

    return (
        <>
            <div className="flex item-center gap-2">
                <p className="text-center font-semibold text-black  mb-0">Pick A Major:</p> {/*Title*/}
                <SelectInSearch /> {/* New Prop we created this is what gets the data from the database and lists the course objects fromt he data recieved from the database*/}
                
                {isModalOpen &&(
                    <>
                    <Modal
                    show={isModalOpen}
                    onHide={handleCloseModal}
                    backdrop="static"
                    keyboard={false}
                    >
                    <Modal.Header closeButton>
                    <Modal.Title>Load Default Major</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
    
                        Do you want to load a default template of your selected major? <br></br>
                        You can choose to:
                        <ol>
                            <li>- Reset your current schedule and load the default</li>
                            <li>- Add the default on top of your current schedule</li>
                            <li>- Cancel and keep your current schedule by clicking the X above</li>
                        </ol>

    
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleReset}>  Reset Schedule  </Button>
                        <button style = {{height:'40px', width: '130px'}} className="bg-umbcGold text-umbcBlack font-semibold rounded-lg shadow-md hover:bg-umbcBlack hover:text-umbcGold" onClick={handleLeaveAsIs}> Add To Current </button> {/* keep courses*/}
                    </Modal.Footer>
                </Modal>
                </>
                )}
            </div>
        </>
    );
}

export default MajorDropdown;