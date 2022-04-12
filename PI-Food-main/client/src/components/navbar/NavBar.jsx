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
                <div className={s.imgContainer}>
                    <Link to='/'>
                        <img src={logo} alt="logo" className={s.logo} />
                    </Link>
                </div>
                <div className={s.resetContainer}>
                    <Link to="/" className={s.linkButton}>
                        <button className={s.navbarButton} onClick={handleClick}>Reset page</button>
                    </Link>
                </div>
                <div className={s.createContainer}>
                    <Link to={'/create'} className={s.linkButton}>
                        <button className={s.navbarButton}>Create new recipe</button>
                    </Link>
                </div>
                <div className={s.searchBarCointainer}>
                    <SearchBar />
                </div>
        </div>
    )
}