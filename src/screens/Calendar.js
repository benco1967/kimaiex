import './Calendar.css'
import {useState} from "react";

const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

function Calendar({onSelect}) {
    const [selected, setSelected] = useState(null);
    const [offset, setOffset] = useState(0);
    const today = new Date().toISOString().slice(0, 10);
    let prevMonday = new Date();
    prevMonday = new Date(prevMonday.setDate(prevMonday.getDate() - ((prevMonday.getDay() + 6) % 7 + 7 - offset)))
    let dates = [];
    for (let i = 0; i < 14; i++) {
        dates.push(new Date(prevMonday.getTime() + i * 24 * 60 * 60 * 1000));
    }
    const month1 = MONTHS[dates[3].getMonth()];
    const month2 = MONTHS[dates[10].getMonth()];
    dates = dates.map(date => date.toISOString().slice(0, 10));
    const handleSelect = date => () => {
        setSelected(date);
        onSelect(date);
    }
    const handleOffset = off => () => {
        setSelected(null);
        onSelect(null);
        setOffset(off);
    }
    return (
        <div>
            <h1>Date</h1>
            <div className={'calendar-nav'}>
                <div className={'prev'} onClick={handleOffset(offset - 7)}>&#9650; Semaine précédente</div>
                <div className={'today'} onClick={handleOffset(0)}>&#9670; Aujourd'hui</div>
                <div className={'next'} onClick={handleOffset(offset + 7)}>&#9660; Semaine suivante</div>
            </div>
            <div className="calendar">
                <div></div>
                <div className={'weekday'}>L</div>
                <div className={'weekday'}>M</div>
                <div className={'weekday'}>M</div>
                <div className={'weekday'}>J</div>
                <div className={'weekday'}>V</div>
                <div className={'weekend'}>S</div>
                <div className={'weekend'}>D</div>
                <div className={'month'}>{month1}</div>
                {
                    dates.slice(0, 7).map(date => (
                        <div key={date}
                             className={`item${selected === date ? " selected" : ""}${date === today ? " today" : ""}`}
                             onClick={handleSelect(date)}>{date.slice(8, 10)}</div>
                    ))
                }
                <div className={'month'}>{month2}</div>
                {
                    dates.slice(7).map(date => (
                        <div key={date}
                             className={`item${selected === date ? " selected" : ""}${date === today ? " today" : ""}`}
                             onClick={handleSelect(date)} onDoubleClick={() => console.log('double clic')}>{date.slice(8, 10)}</div>
                    ))
                }

            </div>
        </div>
    );
}

export default Calendar;
