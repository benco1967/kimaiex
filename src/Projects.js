import {ProjectItem} from "./ProjectItem";


function Projects({projects, loading, error, onUpdate, onSelectProject}) {
  return (
    <div>
      <h1>Projets</h1>
      <div><button onClick={onUpdate}>Charger</button></div>
      {
        error && (<div className="Projects-error">
          {error}
        </div>)
      }
      {loading && (<div>Chargement...</div>)}
      {!loading && !projects && (
        <div>Veuillez rafraîchir la liste</div>
      )}
      {!loading && projects && (
        <div>
          {
            projects.map(project => (<ProjectItem key={project.id} project={project} onSelect={() => onSelectProject(project.id)}/>))
          }
        </div>
      )}
    </div>
  )
}

export default Projects;
