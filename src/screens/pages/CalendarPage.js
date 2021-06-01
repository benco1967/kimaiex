import {Redirect, useParams} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import Header from "../../items/Header";
import CurrentDateSelector from "../CurrentDateSelector";
import {formatDate} from "../../common/dateUtil";
import {getTimesheetsOf} from "../../api/timesheets";
import './CalendarPage.css';
import {contrastedColor} from "../../common/color";

function CalendarPage({params: {user, projects, activities}}) {
    const {date: rawDate} = useParams();
    const date = useMemo(() => new Date(rawDate), [rawDate]);
    const today = date.toISOString().slice(0, 10);
    const [timesheets, setTimesheets] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [redirection, setRedirection] = useState(null);
    useEffect(() => {
        async function fetchData() {
            try {
                setError(null);
                setLoading(true);
                const timesheets = await getTimesheetsOf(user, date);
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
    }, [user, date]);
    console.log('timesheets', timesheets);
    const noTimesheet = timesheets === null || timesheets?.length === 0;
    const duration = timesheets.reduce((d, {duration}) => {
        d += duration / 3600
        return d;
    }, 0)
    const handleSelect = projetId => () => {
        setRedirection(`/projects/${projetId}/${today}`);
    }

    if (redirection !== null) {
        return (<Redirect to={redirection}/>);
    }
    return (
        <div>
            <Header cmd="Retour" title={formatDate(date)} error={error} loading={loading}
                    backPath={'/'}/>
            <div className={'main'}>
                <CurrentDateSelector baseUrl={`/calendar`} date={date}/>
                {duration > 0 ? (<h1>Temps : {duration}h</h1>) : (<h1>Temps</h1>)}

                {!noTimesheet && (<div className={'calendar-time'}>{timesheets?.map(({activity, duration, project}) => {
                    const p = projects.find(p => p.id == project);
                    const a = activities.find(a => a.id === activity);
                    return (
                        <>
                            <div style={{backgroundColor: p?.color, color: contrastedColor(p?.color)}} onClick={handleSelect(p?.id)}>{p?.name}</div>
                            <div style={{backgroundColor: a?.color, color: contrastedColor(a?.color)}} onClick={handleSelect(p?.id)}>{a?.name}</div>
                            <div onClick={handleSelect(p?.id)}>{duration / 3600}h</div>
                        </>);
                })}
                </div>)}
                {noTimesheet && !loading && (<div>Aucun temps enregistré</div>)}
                {noTimesheet && loading && (<div>Chargement...</div>)}
            </div>
        </div>
    );
}

export default CalendarPage;