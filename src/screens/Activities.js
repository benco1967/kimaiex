import {useState} from "react";
import {ActivityItem} from "../items/ActivityItem";
import {filterActivityByProject} from "../common/parameters";

function Activities({project:{id, name, color, date}, activities, timesheets, onChangeTime}) {
  const [selected, setSelected] = useState(null);

  const handleValidate = (id, newDuration, lunchBox) => {
    setSelected(null);
    onChangeTime(id, newDuration, lunchBox);
  }
  const handleSelected = activityId => () => {
    setSelected(selected !== activityId ? activityId : null);
  }
  return (
    <div>
      <h1>Tâches :</h1>
      {!timesheets && (<div>Chargement...</div>)}
      {timesheets && activities && activities
        .filter(filterActivityByProject(id))
        .map((activity) => (
          <ActivityItem key={activity.id} activity={activity}
                        selected={activity.id === selected} onSelect={handleSelected(activity.id)}
                        onValidate={handleValidate}
                        timesheets={timesheets}/>))}
    </div>
  )
}

export default Activities;
