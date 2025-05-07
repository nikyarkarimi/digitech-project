import Cable from "../Cable.jsx";
import { RotateCcw } from 'lucide-react';

export default function Sidebar() {
    return(
        <>
            <div id="sidebar">
                <h2>cables</h2>
                <Cable/>
                <div>
                    <h2>jumper</h2>

                </div>
                <div>
                    <h2>show:</h2>
                    <input type="radio" id="info" name="show" />
                    <label htmlFor="info">info</label><br />
                    <input type="radio" id="info" name="color" />
                    <label htmlFor="info">color</label>
                </div>
                <div>
                    <h2>reset</h2>
                    <button id={"reset-btn"} onClick={() => {alert("Board reset!")}}>
                        <RotateCcw />
                    </button>
                </div>
            </div>
        </>
    );
}