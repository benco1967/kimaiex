import './Projects.css';
import {useEffect, useState} from "react";
import {contrastedColor} from "../common/color";

function ProjectItem({project: {name, color}, selected, onSelect}) {
    return (
        <div className={`project-item${selected ? ' selected' : ''}`}
             style={selected ? {} : {backgroundColor: color, color: contrastedColor(color)}}
             onClick={onSelect}>{name}</div>
    );
}

function ProjectsFilter({search, handleSearch}) {
    return (
        <div className={'projects-filter'}>
            <label>Filtre </label><input type="text" value={search} onChange={e => handleSearch(e.target.value)}/>
        </div>
    );
}

function Projects({projects, loading, onUpdate, onSelect}) {
    const [selected, setSelected] = useState(null);
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [filter, setFilter] = useState('');
    useEffect(() => {
        const result = projects.filter(project => project.name.toLowerCase().includes(filter));
        setFilteredProjects(result);
    }, [filter, projects]);
    const handleSearch = value => {
        setFilter(value.toLowerCase());
    }
    const handleSelected = (id) => () => {
        onSelect(id);
        setSelected(id);
    }

    return (
        <div>
            <h1>Projets <span className={'projects-button'} onClick={onUpdate}>&#11118; Rafraîchir</span></h1>
            <ProjectsFilter search={filter} handleSearch={handleSearch}/>
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
