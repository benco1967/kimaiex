import './ActivityItem.css';
import {useEffect, useState} from "react";
import Cursor from './Cursor';
import ColoredTime from "./ColoredTime";
import {INSTALLATION_ACTIVITY_ID} from "../common/parameters";

export function ActivityItem({activity: {id, name, color}, selected, onSelect, onValidate, timesheets}) {
    const timesheet = timesheets.find(ts => ts.activity === id);
    const duration = timesheet ? timesheet.duration : 0;
    const [time, setTime] = useState(duration / 3600);
    const [lunchBox, setLunchBox] = useState(id === INSTALLATION_ACTIVITY_ID && timesheet && timesheet.tags.length > 0);
    useEffect(() => {
        setTime(duration / 3600);
        setLunchBox(id === INSTALLATION_ACTIVITY_ID && timesheet && timesheet.tags.length > 0);
    }, [selected, duration, id, timesheet]);

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
        onValidate(id, time * 3600, lunchBox);
    }

    const handleSelect = () => {
        setTime(duration / 3600);
        onSelect();
    }
    const handleLaunchBox = () => {
        setLunchBox(!lunchBox);
    }
    const index = [...Array(13).keys()];
    return (
        <div className={`activity ${selected ? 'selected' : ''}`}>
            <ColoredTime title={name} duration={time} color={color} onClick={handleSelect}
                         {...(id === INSTALLATION_ACTIVITY_ID && lunchBox && {extra: '+ panier repas 🍴'})}/>
            {selected && (
                <div>
                    <div className={'edit-time'}>
                        {
                            index.map(i => (<div key={i} onClick={onSetTime(i)}>{i}</div>))
                        }
                    </div>
                    <Cursor duration={time} onSetTime={onSetTime}/>
                    <div className={`edit-buttons${id === INSTALLATION_ACTIVITY_ID ? ' installation' : ''}`}>
                        <div/>
                        <div className={'button'} onClick={onMinus(.25)}>&#8722;</div>
                        <div className={'button'} onClick={onPlus(.25)}>&#43;</div>
                        <div className={'button'} onClick={handleValidation}>Validation</div>
                        {
                            id === INSTALLATION_ACTIVITY_ID && (
                                <>
                                    <div/>
                                    <div className={`button installation${lunchBox ? ' selected' : ''}`} onClick={handleLaunchBox}>{lunchBox ? 'Panier repas' : 'Pas de repas'}</div>
                                </>
                            )
                        }
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