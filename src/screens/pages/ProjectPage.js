import Header from "../../items/Header";
import {Redirect, useParams} from "react-router-dom";
import Activities from "../Activities";
import {useEffect, useMemo, useState} from "react";
import {getTimesheetsOf} from "../../api/timesheets";
import CurrentDateSelector from "../CurrentDateSelector";
import ColoredTime from "../../items/ColoredTime";
import ProjectsResume from "../../items/ProjectsResume";

function ProjectPage(
    {
        params: {
            user, projects, activities
        }
        ,
        backPath
    }
) {
    const {id, date: rawDate} = useParams();
    const projectId = useMemo(() => Number.parseInt(id), [id]);
    const date = useMemo(() => new Date(rawDate), [rawDate]);
    console.log('date', rawDate, date)
    const project = useMemo(() => projects.find(({id}) => projectId === id), [projects, projectId]);
    const projectName = useMemo(() => project.name.length > 12 ? `${project.name.slice(0, 10)}...` : project.name, [project]);
    const [timesheets, setTimesheets] = useState(null);
    const [allProjects, setAllProjects] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    async function fetchData() {
        try {
            setError(null);
            setLoading(true);
            setTimesheets(null);
            setAllProjects(null);
            const timesheets = await getTimesheetsOf(user, date);
            const ownTimesheets = timesheets.filter(t => t.project === projectId);
            let otherDuration = null;
            const allProjects = timesheets.reduce((p, t) => {
                if (!(t.project in p)) {
                    p[t.project] = {duration: 0, id: t.project};
                }
                p[t.project].duration += t.duration;
                otherDuration += t.duration;
                return p;
            }, {});
            if (otherDuration !== null) {
                setAllProjects(allProjects);
            }
            setTimesheets(ownTimesheets);
            setLoading(false);
            console.log('project timesheets', ownTimesheets, allProjects);
        } catch (e) {
            console.log(e)
            setLoading(false);
            setError("Erreur de récupération des données")
            console.error(e)
        }
    }

    useEffect(() => {
        fetchData();
    }, [user, date, projectId]);

    const handleTimesheetSet = (activityId, duration) => {
        const timesheet = timesheets.find(t => t.activity == activityId);
        console.log('modified timesheet', timesheet);
        // TODO créer la timesheet si elle n'existe pas et mettre à jour la duration
        // TODO l'nvoyer au serveur
        // TODO relire les données du serveur
    }
    return (
        <div>
            <Header cmd="Retour" title={projectName} error={error} loading={loading}
                    backPath={backPath}/>
            <div className={'main'}>
                <h1>Projet : {project.name}</h1>
                <CurrentDateSelector baseUrl={`/projects/${id}`} date={date}/>
                <Activities project={project} activities={activities} date={date} timesheets={timesheets} onChangeTime={handleTimesheetSet}/>
                <ProjectsResume projects={allProjects} date={rawDate} projectsDescription={projects}
                                loading={loading}/>
            </div>
        </div>
    );
}

export default ProjectPage;