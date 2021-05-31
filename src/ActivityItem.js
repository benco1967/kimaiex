import './ActivityItem.css';
import {useState} from "react";
import {contrastedColor} from "./common/color";

export function ActivityItem({activity: {id, name, color}, selected, onSelect, onValidate, duration}) {
  const [time, setTime] = useState(duration);

  const onMinus = () => {
    console.log('minus');
    if (time > 0.) {
      setTime(time - .25);
    }
  }
  const onPlus = () => {
    console.log('plus', time);
    if (time < 12.) {
      setTime(time + .25);
    }
  }
  return (
    <div className={`${selected ? 'selected' : ''}`} onClick={onSelect}>
      <div className={'activity-title'} style={{backgroundColor: color, color: contrastedColor(color)}}>{name} {duration}</div>
      {selected && (<div>
        <button onClick={onMinus}>-</button>
        <div>{time}</div>
        <button onClick={onPlus}>+</button>
        <button onClick={() => onValidate(id, time)}>Validation</button>
      </div>)}
    </div>
  );
}
