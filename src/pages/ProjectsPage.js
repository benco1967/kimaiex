import Header from "../items/Header";
import Projects from "../screens/Projects";
import Calendar from "../screens/Calendar";
import {Redirect} from "react-router-dom";
import {useState} from "react";

function ProjectsPage({setUser, params: {error, loading, projects, onUpdateProjects}}) {
    const [project, setProject] = useState(null);
    const [date, setDate] = useState(null);
    if(date !== null && project !== null) {
        return (<Redirect to={`/projects/${project}/${date}`}/>);
    }
    return (
        <div>
            <Header cmd="Déconnexion" title="Projets/Dates" error={error} loading={loading} onBack={() => setUser(null)}/>
            <div className={'main'}>
                <Calendar onSelect={setDate}/>
                <Projects loading={loading} projects={projects} onSelect={setProject} onUpdate={onUpdateProjects}/>
            </div>
        </div>
    );
}

export default ProjectsPage;