import './Calendar.css'
import {useState} from "react";

function Calendar({onSelect}) {
    const [selected, setSelected] = useState(null);
    const dates = [-1, 0, 1].map(offset => new Date(new Date().getTime() - offset * 24 * 60 * 60 * 1000).toISOString().slice(0, 10));
    const handleSelect = date => () => {
        setSelected(date);
        onSelect(date);
    }
    return (
        <div>
            <div>Calendrier</div>
            {
                dates.map(date => (
                    <div key={date} className={selected === date ? "calendar-item selected" : "calendar-item"}
                         onClick={handleSelect(date)}>{date}</div>
                ))
            }
        </div>
    );
}

export default Calendar;
