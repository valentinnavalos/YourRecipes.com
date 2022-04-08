import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postNewRecipe } from "../redux/actions";
import NavBar from "./NavBar";

export default function NewRecipe() {

    const [newRecipe, setNewRecipe] = useState({
        title: '',
        image: '',
        summary: '',
        spoonacularScore: 0,
        healthScore: 0,
        diets: [],
        steps: '',
    });

    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

    const { typesOfDiets } = useSelector(state => state);

    function handleOnChange(e) {
        e.preventDefault();
        setNewRecipe({
            ...newRecipe,
            [e.target.name]: e.target.value,
        });
    }

    function handleOnCheck(e) {
        e.preventDefault();
        if (e.target.checked) {
            setNewRecipe({
                ...newRecipe,
                diets: [...newRecipe.diets, e.target.value],
            });
        } else {
            setNewRecipe({
                ...newRecipe,
                diets: newRecipe.diets.filter(diet => diet !== e.target.value),
            });
        }
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        dispatch(postNewRecipe(newRecipe));
        alert("Recipe added succesfully!");
        setNewRecipe({
            title: '',
            image: '',
            summary: '',
            spoonacularScore: 0,
            healthScore: 0,
            diets: [],
            steps: '',
        });
    }


    return (
        <div>
            <NavBar />
            <br />
            <form onSubmit={handleOnSubmit}>

                <label htmlFor="title">Title </label>
                <input type="text" onChange={handleOnChange} name="title" placeholder="Enter a title.." defaultValue={newRecipe.title} />
                <br />
                <label htmlFor="image">Image url </label>
                <input type='url' onChange={handleOnChange} name="image" placeholder="Enter an image url.." defaultValue={newRecipe.image} />
                <br />
                <label htmlFor="summary">Summary </label>
                <input type="text" onChange={handleOnChange} name="summary" placeholder="Enter a summary.." defaultValue={newRecipe.summary} />
                <br />
                <label htmlFor="spoonacularScore">Spoonacular Score </label>
                <input type='range' min={'0'} max={'100'} onChange={handleOnChange} name="spoonacularScore" placeholder="Enter a score.." defaultValue={newRecipe.spoonacularScore} />
                <br />
                <label htmlFor="healthScore">Health Score </label>
                <input type='range' min={'0'} max={'100'} onChange={handleOnChange} name="healthScore" placeholder="Enter a health score.." defaultValue={newRecipe.healthScore} />
                <br />
                <label htmlFor="diets">Diets </label>
                {/* <input type="text" onChange={handleOnChange} name="diets" placeholder="Enter a type of diet.." defaultValue={newRecipe.diets} /> */}
                {typesOfDiets.map(type => (
                    <div key={type.name}>
                        <input type="checkbox" onChange={handleOnCheck} name="diets" defaultValue={type.name} />
                        <label htmlFor={type.name}>{type.name.toUpperCase()}</label>
                    </div>

                ))}
                <br />
                <label htmlFor="steps">Steps </label>
                <input type="text" onChange={handleOnChange} name="steps" placeholder="Enter steps.." defaultValue={newRecipe.steps} />
                <br />
                <button type="submit" > Create </button>
            </form>
        </div>
    )
}