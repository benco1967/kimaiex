import {Link} from "react-router-dom";
import {useMemo} from "react";
import {formatDate, offsetDate} from "../common/dateUtil";
import './CurrentDateSelector.css';

function CurrentDateSelector({date, baseUrl}) {
    const prev = useMemo(() => offsetDate(date, -1), [date]);
    const next = useMemo(() => offsetDate(date, 1), [date]);
    const formattedDate = useMemo(() => formatDate(date), [date]);
    return (
        <div>
            <h1>Date : {formattedDate}</h1>
            <Link className='day prev' to={`${baseUrl}/${prev}`}>Jour précédent</Link>
            <Link className='day next' to={`${baseUrl}/${next}`}>Jour suivant</Link>
        </div>
    )
}

export default CurrentDateSelector;