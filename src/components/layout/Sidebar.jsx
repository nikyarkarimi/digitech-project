import Cable from "../Cable.jsx";
import { RotateCcw } from 'lucide-react';

export default function Sidebar() {
    return(
        <>
            <div id="sidebar">
                <h2>Cables</h2>
                <Cable/>
                <div>
                    <h2>Jumper</h2>

                </div>
                <div>
                    <h2>Show:</h2>
                    <input type="checkbox" id="radio-info" name="show" />
                    <label htmlFor="radio-info">Info</label><br />
                    <input type="checkbox" id="radio-color" name="show" />
                    <label htmlFor="radio-color">Color</label>
                </div>
                <div>
                    <h2>Reset</h2>
                    <button id={"reset-btn"} onClick={() => {
                        alert("Board reset!");
                        window.location.reload();
                    }}>
                        <RotateCcw />
                    </button>
                </div>
            </div>
        </>
    );
}