import './Cursor.css';

const times = Array.from({length: 48}, (_, i) => (i + 1) * .25);

function Cursor({duration, onSetTime}) {
    return (
        <div className={`cursor ${!onSetTime ? ' small' : ''}`}>
            {
                times.map(t => (
                    <div key={t} className={`slot ${duration >= t ? ' selected' : ''}`}
                        {...(onSetTime && {onClick: onSetTime(t)})}/>
                ))
            }
        </div>
    );
}

export default Cursor;