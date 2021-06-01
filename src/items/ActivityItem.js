import './ActivityItem.css';
import {useMemo, useState} from "react";
import {contrastedColor} from "../common/color";
import Cursor from './Cursor';
import ColoredTime from "./ColoredTime";

export function ActivityItem({activity: {id, name, color}, selected, onSelect, onValidate, timesheets}) {
    const timesheet = timesheets.find(ts => ts.activity === id);
    const duration = timesheet ? timesheet.duration / 3600 : 0;
    const [time, setTime] = useState(duration);

    const onSetTime = value => () => {
        console.log('set');
        setTime(value);
    }
    const onMinus = delta => () => {
        console.log('minus');
        if (time - delta >= 0.) {
            setTime(time - delta);
        }
    }
    const onPlus = delta => () => {
        console.log('plus', time);
        if (time + delta <= 12.) {
            setTime(time + delta);
        }
    }
    const handleValidation = () => {
        onValidate(id, time);
    }

    const index = [...Array(13).keys()];
    const times = Array.from({length: 48}, (_, i) => (i + 1) * .25);
    return (
        <div className={`activity ${selected ? 'selected' : ''}`}>
            <ColoredTime title={name} duration={time} color={color} onClick={onSelect}/>
            {selected && (
                <div>
                    <div className={'edit-time'}>
                        {
                            index.map(i => (<div key={i} onClick={onSetTime(i)}>{i}</div>))
                        }
                    </div>
                    <Cursor duration={time} onSetTime={onSetTime}/>
                    <div className={'edit-buttons'}>
                        <div/>
                        <div className={'button'} onClick={onMinus(.25)}>&#8722;</div>
                        <div className={'button'} onClick={onPlus(.25)}>&#43;</div>
                        <div className={'button'} onClick={() => handleValidation}>Validation</div>
                    </div>
                </div>
            )}
            {!selected && (
                <Cursor duration={time}/>
            )}
        </div>
    );
}

//