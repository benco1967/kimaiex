import {Link} from "react-router-dom";

function Home() {
    return (
        <div>
            <div>Calendrier</div>
            <Link to="/projects">Projets en cours</Link>
        </div>
    );
}

export default Home;
