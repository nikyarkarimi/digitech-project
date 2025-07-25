import logo from "../../assets/Logo_FH_new.svg";

export default function Header() {
    return (
        <header>
            <img id="logo" src={logo} alt="Logo of the FH Campus Wien" />
        </header>
    );
}
