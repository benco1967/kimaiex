import {useEffect, useState} from "react";
import logo from "../logo.svg";
import './Login.css';

function Login({onLogin, err, location}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(err);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const user = params.get('user');
    const pwd = params.get('pwd');
    if(location.pathname === "/login" && user && pwd) {
      setUsername(user);
      setPassword(pwd);
    }
  }, [location])
  const onSubmit = async event => {
    event.preventDefault();
    await onLogin(username, password);
  }
  return (
    <div className="Login">
      <header className="Login-header">
        <div className="Login-title ">Saisie des Temps</div>
        <img src={logo} width="30%" className="Login-logo" alt="logo"/>

      </header>
      <form className="Login-form" onSubmit={onSubmit}>
        <div>
          <label>identifiant</label>
          <input type="mail" name="username" value={username} onChange={e => {
            setError(null);
            setUsername(e.target.value);
          }}/>
        </div>
        <div>
          <label>mot de passe</label>
          <input type="password" name="password" value={password} onChange={e => {
            setError(null);
            setPassword(e.target.value);
          }}/>
        </div>
        {
          error && (<div className="Login-error">
            {error}
          </div>)
        }
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;
