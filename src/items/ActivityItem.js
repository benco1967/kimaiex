import './ActivityItem.css';
import {useEffect, useState} from "react";
import Cursor from './Cursor';
import ColoredTime from "./ColoredTime";

export function ActivityItem({activity: {id, name, color}, selected, onSelect, onValidate, timesheets}) {
    const timesheet = timesheets.find(ts => ts.activity === id);
    const duration = timesheet ? timesheet.duration : 0;
    const [time, setTime] = useState(duration / 3600);
    useEffect(() => {
        setTime(duration / 3600);
    }, [selected, duration]);

    const onSetTime = value => () => {
        console.log('set');
        setTime(value);
    }
    const onMinus = delta => () => {
        console.log('minus', time);
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
        onValidate(id, time * 3600);
    }

    const handleSelect = () => {
        setTime(duration / 3600);
        onSelect();
    }
    const index = [...Array(13).keys()];
    return (
        <div className={`activity ${selected ? 'selected' : ''}`}>
            <ColoredTime title={name} duration={time} color={color} onClick={handleSelect}/>
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
                        <div className={'button'} onClick={handleValidation}>Validation</div>
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