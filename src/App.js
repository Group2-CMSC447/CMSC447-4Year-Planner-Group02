import './App.css';
import { useState } from "react";
import Year from './components/Year'
import CreditRange from './components/CreditRange'

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
    };

    return (
      <div className="flex flex-col" data-testid="callYear">

          <div className="flex flex-col justify-center items-center min-h-screen">

                <h1 className="text-center text-xl font-semibold">4 Year Plan</h1>
                {
                    //Credit slider, change vals pushes changes to the min and max variables
                }
                <CreditRange changeVals={changeVals}></CreditRange>
                {
                  //Map years out to create the objects
                  years.map((year) => {     
                      return (
                          <Year name={year.name} className="flex-grow w-full" />

                      );
                  })
                }
          </div>
            
            <button onClick={addYear} className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Add Empty Year
            </button>
        <a
          className="Github-Link"
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
