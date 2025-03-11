import { useState, useEffect } from 'react';
import axios from 'axios';

function MajorDropdown({ onConfirm }) { //Takes a prop from semester which is an on confirm event that calls add course
    const [selectCourse, setSelectCourse] = useState([]) //collect course options from database
    const [selectedValue, setSelectedValue] = useState('') //get the selected course

    const handleConfirm = (e) => { //runs after clicking add in the modal
        if (e.target.value) { //ensures a course was actually clicked
            setSelectedValue(e.target.value)
            onConfirm(e.target.value); //uses the passed prop from semester to send the selected value to a function called add course which gets the selected value as a prop newCourse
        }
    }

    useEffect(() => {  //runs whenever there is a change in the rendering of screen but for our project it only runs once
        let processing = true //used to fix some bug with react


        //CHANGE LATER CHANGE LATER CHANGE LATER
        //             NEED MAJOR BACKEND SUPPORT
        axiosFetchCourses(processing)

        return () => {
            processing = false
        }
    }, []) //lets it know to only run once

    //REPLACE WITH MAJOR NAME FUNCTION CALL
    //CHANGE LATER CHANGE LATER CHANGE LATER
    //             NEED MAJOR BACKEND SUPPORT
    const axiosFetchCourses = async (processing) => { //api call to get data [async = a function that can wait]
        try {
            const res = await axios.get('http://localhost:4000/courses') //request data from our backend running on port 4000
            if (processing) {
                setSelectCourse(res.data) // set the select course array to whatever we got from api call
            }
        }
        catch (error) { console.error(error) }
    }

    const SelectInSearch = () => {
        //This is a prop created to get all courses from an api then create an option for each
        return (
            <select value={selectedValue} onChange={(e) => handleConfirm(e)}> {/* the value for the select gets set once the option is picked*/}
                {
                    selectCourse?.map((item) => ( //The map function iterates through the array selectCourse as long as there is something in there
                        <option value={item.name} key={item.id}> {item.name} </option> //displays options by the courses.name, the value of the object is the objects.name and is passed to the value of selectedValue so it only has the string value
                    ))
                }
            </select>
        )
    }

    return (
        <>
            <div className="flex item-center gap-2">
                <p className="text-center font-semibold text-black  mb-0">Select Major:</p> {/*Title*/}
                <SelectInSearch /> {/* New Prop we created this is what gets the data from the database and lists the course objects fromt he data recieved from the database*/}
            </div>
        </>
    );
}

export default MajorDropdown;