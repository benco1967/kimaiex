import './App.css';
import Login from "./Login";
import {useState} from "react";
import Projects from "./Projects";

function App() {
  const [user, setUser] = useState(null);

  const onLogin = (username, password) => {
    setUser({username, password});
  }
  if (user === null) {
    return (
      <Login onLogin={onLogin}/>
    );
  }
  return (
    <Projects user={user}/>
  );
}
/*
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/
export default App;
