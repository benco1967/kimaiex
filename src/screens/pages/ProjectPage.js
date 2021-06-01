import Header from "../../items/Header";
import {useParams} from "react-router-dom";
import Activities from "../Activities";
import {useEffect, useMemo, useState} from "react";
import {getTimesheetsOf} from "../../api/timesheets";
import CurrentDateSelector from "../CurrentDateSelector";
import ColoredTime from "../../items/ColoredTime";

function ProjectPage({params: {user, projects, activities}, backPath}) {
    const {id, date: rawDate} = useParams();
    const projectId = useMemo(() => Number.parseInt(id), [id]);
    const date = useMemo(() => new Date(rawDate), [rawDate]);
    console.log('date', date)
    const project = useMemo(() => projects.find(({id}) => projectId === id), [id, projects]);
    const projectName = useMemo(() => project.name.length > 12 ? `${project.name.slice(0, 10)}...` : project.name, [id]);
    const [timesheets, setTimesheets] = useState(null);
    const [otherDuration, setOtherDuration] = useState(null);
    const [otherProjects, setOtherProjects] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function fetchData() {
            try {
                setError(null);
                setLoading(true);
                const timesheets = await getTimesheetsOf(user, date);
                setTimesheets(timesheets.filter(t => t.project === projectId));
                setOtherDuration(timesheets.reduce((d, t) => {
                    if (t.project !== projectId) {
                        d += t.duration;
                    }
                    return d;
                }, 0));
                const otherProjects = timesheets.reduce((p, t) => {
                    if (t.project !== projectId) {
                        if (!(t.project in p)) {
                            p[t.project] = {duration: 0, id: t.project};
                        }
                        p[t.project].duration += t.duration;
                    }
                    return p;
                }, {});
                setOtherProjects(otherProjects);
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

    const otherProjectsDivs = () => {
        return otherProjects !== null ? Object.values(otherProjects).map(p => {
            const project = projects.find(project => p.id === project.id);
            return (
                <ColoredTime key={p.id} color={project.color} duration={p.duration} title={project.name}/>
            )}) :
            loading ? (
                <div>Chargement...</div>
            ) : undefined;
    }

    return (
        <div>
            <Header cmd="Retour" title={projectName} error={error} loading={loading}
                    backPath={backPath}/>
            <div className={'main'}>
                <h1>Projet : {project.name}</h1>
                <CurrentDateSelector baseUrl={`/projects/${id}`} date={date}/>
                <Activities project={project} activities={activities} date={date} timesheets={timesheets}/>

                <h1>Autres projets sur cette journée : {otherDuration / 3600}h</h1>

                {otherProjectsDivs(otherProjects)}
            </div>
        </div>
    );
}

export default ProjectPage;