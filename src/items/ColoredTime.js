import {contrastedColor} from "../common/color";
import './ColoredTime.css';

function ColoredTime({title, duration, color, extra, ...other}) {
    return (
        <div className={'colored-time'}
             style={{backgroundColor: color, color: contrastedColor(color)}}
             {...other}>
            {title} : {duration}h
            <span> {extra}</span>
        </div>
    );
}

export default ColoredTime;