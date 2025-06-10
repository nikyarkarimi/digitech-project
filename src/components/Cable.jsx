import { defaultCable, blackCable, cyanCable, blueCable, greenCable, brownCable, pinkCable, redCable, yellowCable } from "../assets/asset_exports.js";
import { useCable } from "../contexts/CableContext.jsx";

export default function Cable() {
    const cableImages = [defaultCable, blackCable, cyanCable, blueCable, greenCable, brownCable, pinkCable, redCable, yellowCable];

    const { selectedCableIndex, setSelectedCableIndex } = useCable();

    const toggleCable = (index) => {
        if (selectedCableIndex === index) {
            setSelectedCableIndex(null); // unselect
        } else {
            console.log("Kabel ausgewählt Index:", index);
            setSelectedCableIndex(index); // select
        }
    };


    return (
        <div id="cables">
            {cableImages.map((img, idx) => (
                <img
                    key={idx}
                    className={`single-cable ${selectedCableIndex === idx ? "selected" : ""}`}
                    src={img}
                    alt="cable"
                    onClick={() => toggleCable(idx)}
                />
            ))}
        </div>
    );
}
