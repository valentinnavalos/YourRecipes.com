import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postNewRecipe } from "../redux/actions";
import NavBar from "./NavBar";

export default function NewRecipe() {

    const [newRecipe, setNewRecipe] = useState({
        title: '',
        image: '',
        summary: '',
        spoonacularScore: '',
        healthScore: '',
        diets: [],
        steps: []
    });

    const dispatch = useDispatch();

    const { recipeDetail } = useSelector(state => state);

    function handleOnChange(e) {
        e.preventDefault();
        setNewRecipe({
            ...newRecipe,
            [e.target.name]: e.target.value,
        });
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        dispatch(postNewRecipe(newRecipe));
        alert(recipeDetail.msg);
    }


    return (
        <div>
            <NavBar />
            <br />
            <form onSubmit={handleOnSubmit}>
                <label htmlFor="title">Title </label>
                <input type="text" onChange={handleOnChange} name="title" placeholder="Enter a title.." />
                <br />
                <label htmlFor="image">Image url </label>
                <input type='url' onChange={handleOnChange} name="image" placeholder="Enter an image url.." />
                <br />
                <label htmlFor="summary">Summary </label>
                <input type="text" onChange={handleOnChange} name="summary" placeholder="Enter a summary.." />
                <br />
                <label htmlFor="spoonacularScore">Spoonacular Score </label>
                <input type='number' onChange={handleOnChange} name="spoonacularScore" placeholder="Enter a score.." />
                <br />
                <label htmlFor="healthScore">Health Score </label>
                <input type="number" onChange={handleOnChange} name="healthScore" placeholder="Enter a health score.." />
                <br />
                <label htmlFor="diets">Diets </label>
                <input type="text" onChange={handleOnChange} name="diets" placeholder="Enter a type of diet.." />
                <br />
                <label htmlFor="steps">Steps </label>
                <input type="text" onChange={handleOnChange} name="steps" placeholder="Enter steps.." />
                <br />
                <button type="submit" > Create </button>
            </form>
        </div>
    )
}