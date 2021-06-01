import {useMemo, useState} from "react";
import {ActivityItem} from "../items/ActivityItem";
import {filterActivityByProject} from "../common/parameters";

function Activities({project:{id, name, color, date}, activities, timesheets}) {
  const [selected, setSelected] = useState(null);

  console.log(timesheets)
  console.log(selected)
  const onValidate = (id, newDuration) => {
    console.log('onValidate', id, newDuration)
    setSelected(0);
  }
  const handleSelected = i => () => {
    setSelected(selected !== i ? i : null);
  }
  return (
    <div>
      <h1>Tâches :</h1>
      {!timesheets && (<div>Chargement...</div>)}
      {timesheets && activities && activities
        .filter(filterActivityByProject(id))
        .map((activity, i) => (
          <ActivityItem key={activity.id} activity={activity}
                        selected={i === selected} onSelect={handleSelected(i)}
                        onValidate={onValidate}
                        timesheets={timesheets}/>))}
    </div>
  )
}

export default Activities;
