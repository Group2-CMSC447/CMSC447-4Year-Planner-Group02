import Semester from './Semester';
//import Button from 'react-bootstrap/Button';
import {useState} from "react";
function Year(props) {

    //establish variables without having to use props.x 
    const { preUMBC, semesters } = props;

    //boolean varaibles for showing the add semester buttons
    const [fall, setFall] = useState(false); //dont show on default
    const [spring, setSpring] = useState(false); //dont show on default
    const [winter, setWinter] = useState(preUMBC ? false : true); //show only if not preUMBC year
    const [summer, setSummer] = useState(preUMBC ? false : true); //show only if not preUMBC year

    
    const addSemester = (semesterID) => {
        const newSemNum = semesterID + 1;
        //Don't add any semesters past summer
        if (newSemNum === 5) return;

        let newSem;
        //update newsem to pass upwards and set the button hide boolean
        if (newSemNum === 1) {
            newSem = { name: "Fall", courses: [] };
            setFall(false);
        }
        else if (newSemNum === 2) {
            newSem = { name: "Spring", courses: [] };
            setSpring(false);
        }
        else if (newSemNum === 3) {
            newSem = { name: "Winter", courses: [] };
            setWinter(false);
        }
        else if (newSemNum === 4) {
            newSem = { name: "Summer", courses: [] };
            setSummer(false);
        }
        //add the new sem on before sorting
        const updatedSemesters = [...semesters, newSem];

        //Assign orders
        const order = { "Fall": 1, "Winter": 2, "Spring": 3, "Summer": 4 };

        // Sort the semesters based on the order
        updatedSemesters.sort((a, b) => order[a.name] - order[b.name]);

        //pass back the updated list of semesters to app.js to format
        props.updateYear({ name: props.name, semesters: updatedSemesters, preUMBC: props.preUMBC, GetCreditRange: props.GetCreditRange });
    };


    // const defaultMajorYear = (semesters) => {
    //     const newSems = semesters.map(sem => 
    //         sem.name === newSem.name ? newSem : sem
    //     );
    //     props.updateYear({ name: props.name, semesters: newSems, preUMBC: props.preUMBC });
    // }

    const updateSemester = (newSem) => {
        const newSems = semesters.map(sem =>
            sem.name === newSem.name ? newSem : sem
        );
        props.updateYear({ name: props.name, semesters: newSems, preUMBC: props.preUMBC, GetCreditRange: props.GetCreditRange });
    }
    //Function for when the x is clicked on a semester, is a callback function used by semester
    const removeSemester = (semName) => {

        //Remove the desired semester
        const newSems = semesters.filter(
            (sem) => sem.name !== semName
        )

        //Show the correct button to allow for the user to add the semester back
        if (semName === "Fall") {
            setFall(true);
        }
        else if (semName === "Spring") {
            setSpring(true);
        }
        else if (semName === "Winter") {
            setWinter(true);
        }
        else if (semName === "Summer") {
            setSummer(true);
        }
        //Pass back changes to the year's semester to app.js
        props.updateYear({ name: props.name, semesters: newSems, preUMBC: props.preUMBC, GetCreditRange: props.GetCreditRange });
    }

    return (
        <div className="m-1 py-8 px-8 w-full space-y-2 border border-gray-300 bg-white rounded-xl shadow-md sm:py-2 sm:flex sm:items-center sm:space-y-0 sm:gap-x-6">
            <div className="space-y-2 text-center sm:text-left w-full">
                <div className="space-y-0.35">
                    <div className="relative">
                    <p className="text-lg font-semibold text-black text-center ">{props.name}</p>
                        {
                            //Necessary for hiding the button if pre-umbc year
                            !preUMBC && <button
                                className="absolute top-0 right-0 text- font-semibold  hover:text-red-600"
                                onClick={() => props.removeYear(props.name)}>
                                X
                            </button>
                        }
                    </div>
                    <div className="m-2 border border-gray-300 rounded-xl py-6 px-4 w-full space-y-2 bg-white rounded-xlsm:py-4 sm:flex sm:items-center sm:space-y-0 sm:gap-x-6">
                        
                        {
                            //Only show the "add semester" message if no semesters are present
                            (!preUMBC && fall && spring && winter && summer) && <button className="w-full text-center">Click one of the add semester buttons below!</button>
                        }
                        
                        {/* Make Semesters take equal width */}
                        {
                            semesters.map((sem) => {
                                return (
                                    
                                    <Semester key={sem.name}
                                        name={sem.name}
                                        courses={sem.courses}
                                        yearName={props.name}
                                        removeFromSemester={props.removeFromSemester}
                                        updateSemester={updateSemester}
                                        removeSemester={removeSemester}
                                        preUMBC={preUMBC}
                                        prevCourses={props.prevCourses}
                                        GetCreditRange={props.GetCreditRange}
                                    />

                                );
                            })
                        }
                    </div>
                    <div className="flex justify-center gap-2">
                        
                        {/*each set of curly braces check if it should show the corresponding button
                            check for preUMBC to ensure the user cant add semesters to first section    
                        */}
                        {
                            fall && !preUMBC && <button onClick={() => addSemester(0)} style = {{height:'40px'}} className="bg-umbcGold text-umbcBlack font-semibold rounded-lg shadow-md hover:bg-umbcBlack hover:text-umbcGold">
                                Add Fall
                            </button>
                        }
                        {
                            spring && !preUMBC && <button onClick={() => addSemester(1)}  style = {{height:'40px'}} className="bg-umbcGold text-umbcBlack font-semibold rounded-lg shadow-md hover:bg-umbcBlack hover:text-umbcGold">
                                Add Spring
                            </button>
                        }
                        {
                            winter && !preUMBC && <button onClick={() => addSemester(2)} style = {{height:'40px'}} className="bg-umbcGold text-umbcBlack font-semibold rounded-lg shadow-md hover:bg-umbcBlack hover:text-umbcGold">
                                Add Winter
                            </button>
                        }
                        {
                            summer && !preUMBC && <button onClick={() => addSemester(3)} style = {{height:'40px'}} className="bg-umbcGold text-umbcBlack font-semibold rounded-lg shadow-md hover:bg-umbcBlack hover:text-umbcGold">
                                Add Summer
                            </button>
                        }
                    </div>
                    
                    
                </div>
            </div>
        </div>
    )
}

export default Year;