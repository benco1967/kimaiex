import Header from "../items/Header";
import {useParams} from "react-router-dom";
import Activities from "../screens/Activities";
import {useEffect, useState} from "react";
import {getTimesheetsOf} from "../api/timesheets";

function ProjectPage({params: {user, projects, activities}}) {
    const {id, date: rawDate} = useParams();
    const projectId = Number.parseInt(id);
    const date = new Date(rawDate);
    const project = projects.find(({id}) => projectId === id);
    const projectName = project.name.length > 12 ? `${project.name.slice(0, 10)}...` : project.name;
    const formattedDate = date.toLocaleString().slice(0, 10);
    const [timesheets, setTimesheets] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function fetchData () {
            try {
                setError(null);
                setLoading(true);
                const timesheets = await getTimesheetsOf(user, date, projectId);
                setTimesheets(timesheets)
                setLoading(false);
            } catch (e) {
                console.log(e)
                setLoading(false);
                setError("Erreur de récupération des données")
                console.error(e)
            }
        }
        fetchData();
    }, []);
    return (
        <div>
            <Header cmd="Retour" title={projectName} error={error} loading={loading}
                    backPath="/projects"/>

            <h2 style={{backgroundColor: project.color}}>Projet : {project.name}</h2>
            <h2>Date : {formattedDate}</h2>
            <Activities project={project} activities={activities} date={date} timesheets={timesheets}/>
        </div>
    );
}

export default ProjectPage;