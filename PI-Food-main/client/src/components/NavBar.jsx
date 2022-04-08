import React from "react";
import { Link } from 'react-router-dom'
// import Order from "./Order";
// import Reset from "./Reset";
// import SearchBar from "./SearchBar";

export default function NavBar() {

    return (
        <div>
            <div>
                <Link to={'/home'}>Home</Link>
                <br />
                <Link to={'/create'}>Create new recipe</Link>
                {/* <br />
                <SearchBar />
                <br />
                <Reset />
                <br />
                <Order /> */}
            </div>

        </div>
    )
}