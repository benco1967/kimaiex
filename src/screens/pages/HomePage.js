import Header from "../../items/Header";
import Home from "../Home";

function HomePage({setUser, params: {error, loading}}) {
    return (
        <div>
            <Header cmd="Déconnexion" title="Accueil" error={error} loading={loading}
                    onBack={() => setUser(null)}/>
            <Home/>
        </div>
    );
}

export default HomePage;