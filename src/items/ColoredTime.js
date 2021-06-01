import {contrastedColor} from "../common/color";
import './ColoredTime.css';

function ColoredTime({title, duration, color, ...other}) {
    return (
        <div className={'colored-time'}
             style={{backgroundColor: color, color: contrastedColor(color)}}
             {...other}>
            {title} : {duration}h
        </div>
    );
}

export default ColoredTime;