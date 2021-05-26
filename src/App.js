import './App.css';
import Login from "./screens/Login";
import {useState} from "react";
import {login} from "./api/login";
import {getProjects} from "./api/projects";
import {getActivities} from "./api/activities";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectPage from "./pages/ProjectPage";


function App() {
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]);
    const [activities, setActivities] = useState([]);
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

    if (user === null) {
        return (
            <Login onLogin={onLogin} error={error}/>
        );
    }
    const params= {error, loading, user, projects, onUpdateProjects, activities};
    return (
        <Router>
            <Switch>
                <Route path="/projects/:id/:date">
                    <ProjectPage params={params}/>
                </Route>
                <Route path="/">
                    <ProjectsPage setUser={setUser} params={params}/>
                </Route>
            </Switch>
        </Router>
    )
}

export default App;
