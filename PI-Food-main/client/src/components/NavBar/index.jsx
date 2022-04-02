import React from "react";
import { Link } from 'react-router-dom'

export default function NavBar() {
    return (
        <ul>
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/favorites'}>Favoritos</Link></li>
            <li><Link to={'/recipe'}>CreateRecipe</Link></li>
        </ul>
    )
}