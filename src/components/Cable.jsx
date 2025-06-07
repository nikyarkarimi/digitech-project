import {defaultCable, blackCable, cyanCable, blueCable, greenCable, brownCable, pinkCable, redCable, yellowCable} from "../assets/asset_exports.js";
import {useState} from "react";

export default function Cable() {
    const [cableSelect, setCableSelect] = useState([false, false, false, false, false, false, false, false, false]);

    // Array for cable SVGs
    const cableImages =  [defaultCable, blackCable, cyanCable, blueCable, greenCable, brownCable, pinkCable, redCable, yellowCable];

    const toggleCable = (index) => {
        if (cableSelect[index]) {
            setCableSelect(cableSelect.map(() => false));
        } else {
            const newSelected = cableSelect.map(() => false);
            newSelected[index] = !newSelected[index];
            setCableSelect(newSelected);
        }
    }

    return (
        <div id="cables">
            {/* Mapping the initialState indexes to the cable images for referencing in the stylesheet. */}
            {cableSelect.map((initStateValue, initStateIndex) => {return (<img
                key={initStateIndex}
                className={`single-cable ${initStateValue ? "selected" : ""}`}
                src={cableImages[initStateIndex]}
                alt="cable"
                onClick={() => {toggleCable(initStateIndex)}}
            />)})}
        </div>
    );
}