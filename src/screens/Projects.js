import './Projects.css';
import {useEffect, useState} from "react";

function ProjectItem({project: {name, color}, selected, onSelect}) {
    return (
        <div className={selected ? "project-item selected" : "project-item"} style={{backgroundColor: color}}
             onClick={onSelect}>{name}</div>
    );
}

function SearchProject({search, handleSearch}) {

    return (
        <div>
            <label>Recherche</label><input type="text" value={search} onChange={e => handleSearch(e.target.value)}/>
        </div>
    );
}


//<Link const date = new Date().toISOString().slice(0, 10);to={`/projects/${id}/${date}`}

function Projects({projects, loading, onUpdate, onSelect}) {
    const [selected, setSelected] = useState(null);
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [filter, setFilter] = useState('');
    useEffect(() => {
        const result = projects.filter(project => project.name.toLowerCase().includes(filter));
        setFilteredProjects(result);
    }, [filter, projects]);
    const handleSearch = (value) => {
        setFilter(value.toLowerCase());
    }
    const handleSelected = (id) => () => {
        onSelect(id);
        setSelected(id);
    }

    return (
        <div>
            <div>
                <button onClick={onUpdate}>Rafraîchir</button>
            </div>
            <SearchProject search={filter} handleSearch={handleSearch}/>
            {loading && (<div>Chargement...</div>)}
            {!loading && !projects && (
                <div>Veuillez rafraîchir la liste</div>
            )}
            {!loading && projects && (
                <div>
                    {
                        filteredProjects
                            .map(project => (
                                <ProjectItem key={project.id} project={project} selected={selected === project.id}
                                             onSelect={handleSelected(project.id)}
                                />))
                    }
                </div>
            )}
        </div>
    )
}

export default Projects;
