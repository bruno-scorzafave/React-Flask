import { Link } from "react-router-dom";
import { useAuth } from '../../utils/auth';

function Home() {
    const auth = useAuth();
    const isAuthenticated = auth[0];

    return (
        <div className="home">
            {isAuthenticated ? (
                <div>
                    <h1>Welcome back to Recipes!</h1>
                    <Link to="/recipes" className="btn btn-primary mt-3">View Recipes</Link>
                </div>
            ) : (
                <>
                    <h1>Welcome to the Recipes</h1>
                    <Link to="/signup" className="btn btn-primary mt-3">Get Started</Link>
                    <br />
                    <Link to="/login" className="btn btn-primary mt-3">Login</Link>
                </>
            )}
            
        </div>
    );
}

export default Home;