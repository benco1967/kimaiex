import {useState} from "react";
import {URL_KIMAI} from "./common/parameters";
import axios from "axios";


function Project({project: {name, color}}) {
  return (
    <div style={{'background-color':color}}>{name}</div>
  );
}
function Projects({user: {username, password}}) {
  const [projects, setProjects] = useState([])
  const [state, setState] = useState(null);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      setState(false);
      const data = await axios.get(`${URL_KIMAI}/api/projects`, {
        headers: {
          'X-AUTH-USER': username,
          'X-AUTH-TOKEN': password,
        }
      });
      console.log(data.data);
      setProjects(data.data);
      setState(true);
    } catch (e) {
      setError('Impossible de récupérer les projets')
      setState(null);
      setProjects([]);
    }

  };

  return (
    <div>
      <h1>Projets</h1>
      <div><button onClick={async () => await fetchProjects()}>Charger</button></div>
      {
        error && (<div className="Projects-error">
          {error}
        </div>)
      }
      {state === null && (
        <div>Veuillez rafraîchir la liste</div>
      )}
      {state === false && (<div>Chargement...</div>)}
      {state === true && (
        <div>
          {
            projects.map(project => (<Project key={project.id} project={project}/>))
          }
        </div>
      )}
    </div>
  )
}

export default Projects;
