import logo from "./logo.svg";
import './Header.css';

function Header({text, onBack}) {
  return (
    <div className="Header">
      <button onClick={onBack}>{text}</button>
      <img src={logo} width="30%" className="Header-logo" alt="logo"/>
    </div>
  );
}

export default Header;
