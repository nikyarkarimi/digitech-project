import logo from "../assets/Logo_FH.png";

export default function Header() {
    return (
        <header>
            <img id="logo" src={logo} alt="Logo of the FH Campus Wien" />
        </header>
    );
}
