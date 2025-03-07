import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
function CreditRange(props) {
    const [min, setMin] = useState();
    const [max, setMax] = useState();

    const changeVals = (newMin, newMax) => {
        setMin(newMin);
        setMax(newMax);
        
    };

    //const [minCredits, setMinCredits] = useState(null);
    return (
        <div style={{ width: 300, margin: "50px auto" }}>
            <Slider
                range
                defaultValue={ [12,19] }
                pushable={ true}
                count={1}
                min={0}
                max={22}
                
                onChange={changeVals}
            />
            <p>Value: </p>
        </div>
    );
}

export default CreditRange;