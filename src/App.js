import './App.css';
import { useState } from "react";
import Year from './components/Year'
import CreditRange from './components/CreditRange'
import MajorDropdown from './components/MajorDropdown'

function App() {
    const [years, setYears] = useState([
        { name: "Year 1"},
        { name: "Year 2"},
        { name: "Year 3"},
        { name: "Year 4"}
    ]);

    const addYear = () => {
        const newYear = years.length + 1;
        setYears([...years, { name: 'Year ' + newYear}]);
 
    };
    //Use for the credit range checks
    const [min, setMin] = useState();
    const [max, setMax] = useState();

    const changeVals = (value) => {
        console.log("Changed Vals to: " + value[0] + " and " + value[1])
        setMin(value[0]);
        setMax(value[1]);

        /*Console log for preventing errors*/
        console.log("Console log for preventing warnings. Min: " + { min } +" Max:" + { max } )
    };

    //Used for major dropdown and data population
    const [majorName, setMajorName] = useState("Hello");

    const onConfirmMajor = (value) => {
        setMajorName(value);
        console.log("Major name set to: " + majorName);

        //IMPLEMENT LOGIC FOR POPULATING BASIC 4YEAR PLAN HERE
        //
        //
        //
        //
    }

    return (
        <div className="flex flex-col ml-4 mr-4" data-testid="callYear">
            <h1 className="text-center text-xl font-semibold">4 Year Plan</h1>
            <h3 className="text-left text-lg font-semibold">Planner Options:</h3>
                <div className="flex justify-center item-center gap-4">
                    <div className="">
                        <MajorDropdown onConfirm={onConfirmMajor}></MajorDropdown>
                    </div>
                    <div className="flex-auto">
                        <CreditRange changeVals={changeVals}></CreditRange>
                    </div>
                </div>
          {
              //This displays all the year objects stored in the years array
          }
          <div className="flex flex-col justify-center items-center min-h-screen" key="year">
          
              {
                  years.map((year) => {     
                      return (
                          <Year name={year.name} className="flex-grow w-full" key={year.name} />

                      );
                  })
                }
          </div>
            
            <button onClick={addYear} className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Add Empty Year
            </button>
        <a
          className="Github-Link text-center font-semibold"
          href="https://github.com/Group2-CMSC447/CMSC447-4Year-Planner-Group02"
          target="_blank"
          rel="noopener noreferrer"
        >
          Check Our Github
        </a>
    </div>
    
  );
}

export default App;
