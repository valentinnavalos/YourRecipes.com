import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <div>
            <h1>Landing Page del PI FOODS.</h1>
            <br></br>
            <h4>Done by Valentín Avalos.</h4>
            <Link to="/home">
                <button>Go into</button>
            </Link>
        </div>
    )
}