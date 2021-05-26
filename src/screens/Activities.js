import {useState} from "react";
import {ActivityItem} from "../ActivityItem";
import {filterActivityByProject} from "../common/parameters";

function Activities({project:{id, name, color, date}, activities, timesheets}) {
  const [selected, setSelected] = useState(null);

  console.log(timesheets)
  console.log(selected)
  const getDuration = (id) => {
    const timesheet = timesheets.find(ts => ts.activity === id);
    return timesheet ? timesheet.duration / 3600 : 0;
  }
  const onValidate = (id, newDuration) => {
    console.log('onValidate', id, newDuration)
    setSelected(0);
  }
  return (
    <div>
      <h2>Tâches</h2>
      {activities && activities
        .filter(filterActivityByProject(id))
        .map((activity, i) => (
          <ActivityItem key={activity.id} activity={activity}
                        selected={i === selected} onSelect={() => setSelected(i)}
                        onValidate={onValidate}
                        duration={getDuration(activity.id)}/>))}
    </div>
  )
}

export default Activities;
