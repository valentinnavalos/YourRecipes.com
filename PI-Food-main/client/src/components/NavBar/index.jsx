import React from "react";
import { Link } from 'react-router-dom'
import SearchBar from "../SearchBar/SearchBar";

export default function NavBar() {
    return (
        <ul>
            <li><Link to={'/home'}>Home</Link></li>
            <li><Link to={'/favorites'}>Favorites</Link></li>
            {/* <li><Link to={'/recipes/:idReceta'}>Recetas</Link></li> */}
            <SearchBar />
        </ul>
    )
}