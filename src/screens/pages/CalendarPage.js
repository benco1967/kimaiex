import {useParams} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import Header from "../../items/Header";
import CurrentDateSelector from "../CurrentDateSelector";
import {formatDate} from "../../common/dateUtil";
import {getTimesheetsOf} from "../../api/timesheets";
import './CalendarPage.css';
import ProjectsResume from "../../items/ProjectsResume";

function CalendarPage({params: {user, projects}}) {
    const {date: rawDate} = useParams();
    const date = useMemo(() => new Date(rawDate), [rawDate]);
    const today = date.toISOString().slice(0, 10);
    const [projectsData, setProjectsData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function fetchData() {
            try {
                setError(null);
                setLoading(true);
                setProjectsData(null);
                const timesheets = await getTimesheetsOf(user, date);
                let duration = null;
                const projectsData = timesheets.reduce((p, t) => {
                    if (!(t.project in p)) {
                        p[t.project] = {duration: 0, id: t.project};
                    }
                    duration += t.duration;
                    p[t.project].duration += t.duration;
                    return p;
                }, {});
                if(duration !== null) {
                    setProjectsData(projectsData);
                }
                setLoading(false);
            } catch (e) {
                console.error(e);
                setLoading(false);
                setError("Erreur de récupération des données")
            }
        }

        fetchData();
    }, [user, date]);

    return (
        <div>
            <Header cmd="Retour" title={formatDate(date)} error={error} loading={loading}
                    backPath={'/'}/>
            <div className={'main'}>
                <CurrentDateSelector baseUrl={`/calendar`} date={date}/>
                <ProjectsResume projects={projectsData} date={today} loading={loading} projectsDescription={projects}/>
            </div>
        </div>
    );
}

export default CalendarPage;