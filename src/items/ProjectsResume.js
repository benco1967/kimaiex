import {Link} from "react-router-dom";
import ColoredTime from "./ColoredTime";

function ProjectsResume({loading, projects, projectsDescription, date}) {
    const projectsData = projects !== null ? Object.values(projects) : null;
    const duration = projectsData && projectsData.reduce((d, p) => d += p.duration, null);

    console.log('other project', loading, projects, date)

    if (loading) {
        return (
            <>
                <h1>Projets sur cette journée :</h1>
                <div>Chargement...</div>
            </>
        );
    }
    if (duration === null) {
        return (
            <>
                <h1>Aucun projet sur cette journée</h1>
            </>
        )
    }
    return (
        <>
            <h1>Projets sur cette journée : {duration / 3600}h</h1>
            {
                projectsData.map(p => {
                    const project = projectsDescription.find(project => p.id === project.id);
                    return (
                        <Link
                            key={p.id} to={`/projects/${p.id}/${date}`} style={{ textDecoration: 'none' }}>
                            <ColoredTime color={project.color} duration={p.duration / 3600} title={project.name}/>
                        </Link>
                    )
                })
            }
        </>
    );
}

export default ProjectsResume;