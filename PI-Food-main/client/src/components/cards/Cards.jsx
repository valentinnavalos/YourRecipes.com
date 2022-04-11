// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getRecipes } from '../redux/actions';
import Card from '../card/Card';
import s from './Cards.module.css';

export default function Cards({ currentRecipes }) {

    // const dispatch = useDispatch();

    // const { filteredRecipes } = useSelector(state => state);

    // useEffect(() => {
    //     dispatch(getRecipes());
    // }, [dispatch]); //---> componenteDidUpdate()

    // console.log(currentRecipes)

    return (
        <div>
            {currentRecipes.length ? (
                <div className={s.cards}>
                    {currentRecipes.map(recipe => (
                        <Card key={recipe.id} {...recipe} />
                    ))}
                </div>
            ) : (
                <span className={s.notFound}>Recipes not found.</span>
            )}
        </div>
    )
}



// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Card from "./Card";
// // import { getRecipes } from "./../../redux/actions";
// const { searchRecipes } = require('../redux/actions');


// export default function Cards() {
//     // const [isLoading, setIsLoading] = useState(false)
//     // //el useDispatch para poder usar el dispatch.
//     // const dispatch = useDispatch();

//     // //el useSelector para poder usar el state.
//     // const { recipes } = useSelector(state => state);

//     // //el useEffect para poder hacer un componentDidMount.
//     // useEffect(() => {
//     //     setIsLoading(true)
//     //     dispatch(searchRecipes(''));
//     //     setIsLoading(false)
//     // }, [dispatch]);

//     return (
//         <>
//             {recipes.map(recipe => (
//                 <Card
//                     key={recipe.id}
//                     title={recipe.title}
//                     image={recipe.image}
//                     id={recipe.id}
//                 />)
//             )}
//             {/* {recipes.map(recipe => (
//                 <Recipe
//                     key={recipe.id}
//                     title={recipe.title}
//                     image={recipe.image}
//                     id={recipe.id}
//                 />)
//             )}
//             {isLoading ? <h2>Loading...</h2> : <Recipe recipes={recipes} />} */}
//         </>
//     )
// }
