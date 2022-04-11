import React from "react";
import { Link } from 'react-router-dom'
import s from './NavBar.module.css'
import SearchBar from "../searchbar/SearchBar";
import { useDispatch } from "react-redux";
import { getRecipes } from "../../redux/actions";
import logo from './../../images/logoImage.jpg'

export default function NavBar() {

    const dispatch = useDispatch();

    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes())
    }

    return (
        <div className={s.navbar}>
            <div className={s.navButtons}>
                <div>
                    <Link to='/'>
                        <img src={logo} alt="logo" className={s.logo} />
                    </Link>
                </div>
                <div>
                    <Link to="/">
                        <button className={s.navbarButton} onClick={handleClick}>Reset page</button>
                    </Link>
                </div>
                <div>
                    <Link to={'/create'}>
                        <button className={s.navbarButton}>Create new recipe</button>
                    </Link>
                </div>
                <div className={s.searchBarCointainer}>
                    <SearchBar />
                </div>
            </div>
        </div>
    )
}