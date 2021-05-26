import Header from "../items/Header";
import Projects from "../screens/Projects";
import Calendar from "../screens/Calendar";
import {Link} from "react-router-dom";
import {useState} from "react";

function ProjectsPage({setUser, params: {error, loading, projects, onUpdateProjects}}) {
    const [project, setProject] = useState(null);
    const [date, setDate] = useState(null);
    console.log(date, project)
    return (
        <div>
            <Header cmd="Déconnexion" title="Projets/Dates" error={error} loading={loading} onBack={() => setUser(null)}/>
            <Link to={date !== null && project !== null && `/projects/${project}/${date}`}>Saisir les temps</Link>
            <Projects loading={loading} projects={projects} onSelect={setProject} onUpdate={onUpdateProjects}/>
            <Calendar onSelect={setDate}/>
        </div>
    );
}

export default ProjectsPage;