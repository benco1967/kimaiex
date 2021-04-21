import './App.css';
import Login from "./Login";
import {useState} from "react";
import Projects from "./Projects";
import {login} from "./api/login";
import {getProjects} from "./api/projects";
import {getActivities} from "./api/activities";
import Project from "./Project";
import Header from "./Header";
import {getTimesheetsOf} from "./api/timesheets";

function App() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activities, setActivities] = useState([]);
  const [timesheets, setTimesheets] = useState([]);
  const [absences, setAbsences] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async (user) => {
    setError(null);
    setLoading(true);
    const projects = await getProjects(user);
    setProjects(projects)
    setLoading(false);
  }
  const fetchActivities = async (user) => {
    setError(null);
    setLoading(true);
    const activities = await getActivities(user);
    setActivities(activities)
    setLoading(false);
  }
  const fetchTimesheetsOf = async (user, date) => {
    setError(null);
    setLoading(true);
    const timesheets = await getTimesheetsOf(user, date);
    setTimesheets(timesheets)
    setLoading(false);
  }
  const retrieveTimesheets = async () => {
    try {
      const theDay = new Date().toISOString().slice(0, 10);
      await fetchTimesheetsOf(user, theDay);
    } catch(e) {
      console.log(e)
      setLoading(false);
      setError("Erreur d'identification")
      console.error(e)
    }
  }

  const onLogin = async (username, password) => {
    try {
      setError(null);
      const user = await login(username, password)
      setUser(user);
      fetchProjects(user);
      fetchActivities(user);
    } catch (e) {
      console.log(e)
      setLoading(false);
      setError("Erreur d'identification")
      console.error(e)
    }
  }
  const onUpdateProjects = async () => {
    try {
      await fetchProjects(user);
    } catch (e) {
      setLoading(false);
      setError("Erreur de récupération des projets")
      console.error(e)
    }
  }
  const onSelectProject = async (id) => {
    setSelectedProject(projects.find(project => project.id === id));
  }

  if (user === null) {
    return (
      <Login onLogin={onLogin} error={error}/>
    );
  }
  if (selectedProject === null) {
    return (
      <div>
        <Header text="Déconnexion" onBack={() => setUser(null)}/>
        <Projects projects={projects} error={error} loading={loading} onUpdate={onUpdateProjects}
                  onSelectProject={onSelectProject}/>
      </div>
    );
  }
  if (selectedProject) {
    //setTimeout(retrieveTimesheets, 0);
    return (
      <div>
        <Header text="Retour" onBack={() => setSelectedProject(null)}/>
        <Project project={selectedProject} activities={activities} timesheets={timesheets}/>
      </div>

    );
  }
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
