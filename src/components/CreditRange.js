import { useState } from "react";
import Slider, { Range } from "rc-slider";
import 'rc-slider/assets/index.css';
function CreditRange(props) {
    //Needed for the paragraph element displaying the range
    const [low, setLow] = useState(12);
    const [high, setHigh] = useState(20);

    //Function to pass changed values back to App.js
    const updateVals = (value) => {
        setLow(value[0])
        setHigh(value[1])
        props.changeVals(value)
    };
    return (
        
        <div style={{ width: "25%" }}>
            {/* ^^ Controls the size of the slider and box for text*/}
            <Slider range
                min={0}
                max={24}
                defaultValue={[12, 20]}
                count={1}
                step={1}
                onChangeComplete={updateVals}
                pushable

                trackStyle={{
                    //stone 400
                    backgroundColor: "#a1a1aa",
                    height: 10
                }}
                railStyle={{
                    // stone-100
                    backgroundColor: "#f4f4f5",
                    height: 10
                }}
                handleStyle={{
                    // stone-500
                    borderColor: "#71717a",
                    backgroundColor: "white",
                    height: 15,
                    width: 15,
                    marginLeft: 0,
                    marginTop: -2.5
                }}
            />

            <p className="text-md font-semibold text-black text-center"> Preferred Semester Credit Range: {low} - { high}</p>

        </div>
        
    );
}

export default CreditRange;