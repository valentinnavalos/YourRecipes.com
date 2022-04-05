import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Recipe from "../Recipe/Recipe";
// import { getRecipes } from "./../../redux/actions";
const { searchRecipes } = require('./../../redux/actions');


export default function Recipes() {
    const [isLoading, setIsLoading] = useState(false)
    //el useDispatch para poder usar el dispatch.
    const dispatch = useDispatch();

    //el useSelector para poder usar el state.
    const { recipes } = useSelector(state => state);

    //el useEffect para poder hacer un componentDidMount.
    useEffect(() => {
        setIsLoading(true)
        dispatch(searchRecipes(''));
        setIsLoading(false)
    }, [dispatch]);

    return (
        <>
            {isLoading ? <h2>Loading...</h2> : recipes.map(recipe => (
                <Recipe
                    key={recipe.id}
                    title={recipe.title}
                    image={recipe.image}
                    id={recipe.id}
                />)
            )}
            {/* {recipes.map(recipe => (
                <Recipe
                    key={recipe.id}
                    title={recipe.title}
                    image={recipe.image}
                    id={recipe.id}
                />)
            )}
            {isLoading ? <h2>Loading...</h2> : <Recipe recipes={recipes} />} */}
        </>
    )
}