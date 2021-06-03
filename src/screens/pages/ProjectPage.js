import Header from "../../items/Header";
import {useParams} from "react-router-dom";
import Activities from "../Activities";
import {useEffect, useMemo, useState} from "react";
import {getTimesheetsOf, patchTimesheet, postTimesheet} from "../../api/timesheets";
import CurrentDateSelector from "../CurrentDateSelector";
import ProjectsResume from "../../items/ProjectsResume";
import {INSTALLATION_ACTIVITY_ID} from "../../common/parameters";

function ProjectPage({params: {user, projects, activities}, backPath}) {
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

    const fetchDataConsturctor = (user, date, projectId, setError, setLoading, setTimesheets, setAllProjects) =>
        async () => {
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
        const fetchData = fetchDataConsturctor(user, date, projectId, setError, setLoading, setTimesheets, setAllProjects);
        fetchData();
    }, [user, date, projectId]);

    const handleTimesheetSet = async (activityId, duration, lunchBox) => {
        const timesheet = timesheets.find(t => t.activity === activityId);
        console.log('modified timesheet', duration, timesheet);

        const begin = `${rawDate}T07:00:00.000Z`;
        const end = new Date(new Date(begin).getTime() + duration * 1000).toISOString();
        const newTimesheet = {
            begin: begin,
            end: end,
            duration: `${duration}`,
            project: projectId,
            activity: activityId,
            description: '',
            tags: lunchBox && activityId === INSTALLATION_ACTIVITY_ID ? 'panier repas' : '',
            fixedRate: 0,
            hourlyRate: 0,
            user: user.id,
            exported: false
        }
        console.log(JSON.stringify(newTimesheet))

        if (timesheet) {
            if (timesheet.exported) {
                // can't patch this timesheet because it's already exported
                setError(`Impossible de modifier ce temps car il à déjà été exporté`);
            } else {
                // Patch the current timesheet
                await patchTimesheet(user, timesheet.id, {
                    begin: newTimesheet.begin,
                    end: newTimesheet.end,
                    duration: newTimesheet.duration,
                    tags: newTimesheet.tags
                });
                const fetchData = fetchDataConsturctor(user, date, projectId, setError, setLoading, setTimesheets, setAllProjects);
                fetchData();
            }
        } else {
            // create a new timesheet
            await postTimesheet(user, newTimesheet);
            const fetchData = fetchDataConsturctor(user, date, projectId, setError, setLoading, setTimesheets, setAllProjects);
            fetchData();
        }
    }

    return (
        <div>
            <Header cmd="Retour" title={projectName} error={error} loading={loading}
                    backPath={backPath}/>
            <div className={'main'}>
                <h1>Projet : {project.name}</h1>
                <CurrentDateSelector baseUrl={`/projects/${id}`} date={date}/>
                <Activities project={project} activities={activities} date={date} timesheets={timesheets}
                            onChangeTime={handleTimesheetSet}/>
                <ProjectsResume projects={allProjects} date={rawDate} projectsDescription={projects}
                                loading={loading}/>
            </div>
        </div>
    );
}

export default ProjectPage;