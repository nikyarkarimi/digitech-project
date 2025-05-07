import cable from "../assets/cable.svg";
import {useState} from "react";

export default function Cable() {
    const [cableSelect, setCableSelect] = useState([false, false, false]);

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
                src={cable}
                alt=""
                onClick={() => {toggleCable(initStateIndex)}}
            />)})}
        </div>
    );
}