import './Calendar.css'
import {useState} from "react";

function Calendar({onSelect}) {
    const [selected, setSelected] = useState(null);
    const today = new Date().toISOString().slice(0, 10);
    let prevMonday = new Date();
    prevMonday = new Date(prevMonday.setDate(prevMonday.getDate() - ((prevMonday.getDay() + 6) % 7 + 14)))
    const dates = [];
    for(let i = 0; i < 21; i++) {
        dates.push(new Date(prevMonday.getTime() + i * 24 * 60 * 60 * 1000).toISOString().slice(0, 10));
    }
    const handleSelect = date => () => {
        setSelected(date);
        onSelect(date);
    }
    return (
        <div>
            <div>Calendrier</div>
            <div className="calendar">
                <div>L</div>
                <div>M</div>
                <div>M</div>
                <div>J</div>
                <div>V</div>
                <div>S</div>
                <div>D</div>
            {
                dates.map(date => (
                    <div key={date} className={`calendar-item${selected === date ? " selected" : ""}${date === today ? " today" : ""}`}
                         onClick={handleSelect(date)}>{date.slice(8, 10)}</div>
                ))
            }
            </div>
            <div>autre date</div>
        </div>
    );
}

export default Calendar;
