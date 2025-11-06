import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home">
            <h1>Welcome to the Recipes</h1>
            <Link to="/signup" className="btn btn-primary btn-lg">Get Started</Link>
            <br />
            <Link to="/login" className="btn btn-primary btn-lg">Login</Link>
        </div>
    );
}

export default Home;