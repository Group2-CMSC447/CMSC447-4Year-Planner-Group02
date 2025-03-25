import Semester from './Semester';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
function Year(props) {
    const { name, semesters } = props;

    const addSemester = () => {
        const newSemNum = semesters.length + 1;
        //Don't add any semesters past summer
        if (newSemNum === 5) return;

        let newSem;
        if (newSemNum === 1) newSem = { name: "Fall", courses: []};
        else if (newSemNum === 2) newSem = { name: "Spring", courses: [] };
        else if (newSemNum === 3) newSem = { name: "Winter", courses: [] };
        else if (newSemNum === 4) newSem = { name: "Summer", courses: [] };

        const updatedSemesters = [...semesters, newSem];

        //Assign
        const order = { "Fall": 1, "Winter": 2, "Spring": 3, "Summer": 4 };

        // Sort the semesters based on the order
        updatedSemesters.sort((a, b) => order[a.name] - order[b.name]);

        props.updateYear({ name: props.name, semesters: updatedSemesters });
    };

    const updateSemester = (newSem) => {
        const newSems = semesters.map(sem =>
            sem.name === newSem.name ? newSem : sem
        );
        props.updateYear({ name: props.name, semesters: newSems });
    }

    return (
        <div className="m-1 py-8 px-8 w-full space-y-2 border border-gray-300 bg-white rounded-xl shadow-md sm:py-2 sm:flex sm:items-center sm:space-y-0 sm:gap-x-6">
            <div className="space-y-2 text-center sm:text-left w-full">
                <div className="space-y-0.35">
                    <p className="text-lg font-semibold text-black text-center ">{props.name}</p>
                    <div className="m-2 border border-gray-300 rounded-xl py-6 px-4 w-full space-y-2 bg-white rounded-xlsm:py-4 sm:flex sm:items-center sm:space-y-0 sm:gap-x-6">
                        {/* Make Semesters take equal width */}
                        {
                            semesters.map((sem) => {
                                return (
                                    <Semester key={sem.name}
                                        name={sem.name}
                                        courses={sem.courses}
                                        yearName={props.name}
                                        removeFromSemester={props.removeFromSemester}
                                        updateSemester={updateSemester} />

                                );
                            })
                        }
                    </div>
                    <Button onClick={ addSemester} variant="primary">
                        Add Semester
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Year;