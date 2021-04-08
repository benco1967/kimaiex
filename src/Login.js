import {useState} from "react";
import axios from "axios";
import {URL_KIMAI} from "./common/parameters";
import logo from "./logo.svg";
import './Login.css';

function Login({onLogin}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const onSubmit = async event => {
    event.preventDefault();
    try {
      setError(null);
      const pong = await axios.get(`${URL_KIMAI}/api/ping`, {
        headers: {
          'X-AUTH-USER': username,
          'X-AUTH-TOKEN': password,
        }
      });
      console.log(pong)
      if (pong.data?.message !== 'pong') {
        throw new Error("wrong identification");
      }
      onLogin(username, password);

    } catch (e) {
      setError("Erreur d'identification")
      console.error(e)
    }
  }
  return (
    <div className="Login">
      <header className="Login-header">
        <div className="Login-title ">Saisie des T emps</div>
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
