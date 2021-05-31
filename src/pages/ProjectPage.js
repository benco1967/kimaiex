import Header from "../items/Header";
import {Link, useParams} from "react-router-dom";
import Activities from "../screens/Activities";
import {useEffect, useMemo, useState} from "react";
import {getTimesheetsOf} from "../api/timesheets";
import './ProjectPage.css';

function ProjectPage({params: {user, projects, activities}}) {
    const {id, date: rawDate} = useParams();
    const projectId = useMemo(() => Number.parseInt(id), [id]);
    const date = useMemo(() => new Date(rawDate), [rawDate]);
    const prev = useMemo(() => new Date(date.getTime() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10), [rawDate]);
    const next = useMemo(() => new Date(date.getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10), [rawDate]);
    const project = useMemo(() => projects.find(({id}) => projectId === id), [id, projects]);
    const projectName = useMemo(() => project.name.length > 12 ? `${project.name.slice(0, 10)}...` : project.name, [id]);
    const formattedDate = useMemo(() => ['Dim ', 'Lun ', 'Mar ', 'Mer ', 'Jeu ', 'Ven ', 'Sam '][date.getDay()] + date.toLocaleString().slice(0, 10), [rawDate]);
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
    }, [user, date, projectId]);
    return (
        <div>
            <Header cmd="Retour" title={projectName} error={error} loading={loading}
                    backPath="/projects"/>

            <h2 style={{backgroundColor: project.color}}>Projet : {project.name}</h2>
            <h2>Date : {formattedDate}</h2>
            <Link className='prev' to={`/projects/${id}/${prev}`}>Jour précédent</Link>
            <Link className='next' to={`/projects/${id}/${next}`}>Jour suivant</Link>
            <Activities project={project} activities={activities} date={date} timesheets={timesheets}/>
        </div>
    );
}

export default ProjectPage;