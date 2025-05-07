import board from "../../assets/Digitech1v5.svg";

export default function MainContent() {
    return (
        <>
            <div id="content">
                <h1>Digitech Board Simulation</h1>
                <img id={"board-image"} src={board} alt="" />
            </div>
        </>
    );
}