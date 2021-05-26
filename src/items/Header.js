import logo from "../logo.svg";
import './Header.css';
import {Link} from "react-router-dom";

function Header({cmd, title, backPath, onBack, loading, error}) {
    return (
        <div className="Header">
            <div className="Header-main">
                {
                    onBack ?
                        (<div className="Header-button" onClick={onBack}>{cmd}</div>) :
                        (<Link className="Header-button" to={backPath}>{cmd}</Link>)
                }
                <div className="Header-title">{title}</div>
                <img src={logo} width="30%" className="Header-logo" alt="logo"/>
            </div>
            {
                loading && !error ? (
                    <div className="Header-progress">
                        <div className="bar"></div>
                    </div>
                ) : (
                    <div className="Header-progress">
                        <div className={error ? "full error" : "full"}>{error}</div>
                    </div>
                )
            }
        </div>
    )
}

export default Header;
