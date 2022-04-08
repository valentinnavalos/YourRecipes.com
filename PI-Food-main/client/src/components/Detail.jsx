import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearDetail, getRecipeDetail } from "../redux/actions";
import NavBar from "./NavBar";

export default function Detail() {

    const { idRecipe } = useParams();
    const { recipeDetail } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRecipeDetail(idRecipe));

        return () => {
            dispatch(clearDetail());
        }
    }, [dispatch, idRecipe]);

    // console.log(recipeDetail.diets);

    return (
        <div className="detail">
            <NavBar />
            {recipeDetail.title ?

                <div>
                    <h2>{recipeDetail.title}</h2>
                    <img src={recipeDetail.image} alt="imagen" />
                    <p>{recipeDetail.summary}</p>
                    {recipeDetail.spoonacularScore ? <p>Spoonacular Score: {recipeDetail.spoonacularScore}</p> : <p>No score available.</p>}
                    {recipeDetail.healthScore ? <p>Health Score: {recipeDetail.healthScore}</p> : <p>No score available.</p>}
                    {/* {recipeDetail.diets.length ? <p>Diets: {recipeDetail.diets}</p> : <p>There are no types of diets.</p>} */}
                    <div>
                        <h4>Diets:</h4>
                        {recipeDetail.diets?.length ? recipeDetail.diets.map(el => { return (<p>{el}</p>) }) : <p>There are no types of diets.</p>}
                    </div>
                    {/* {recipeDetail.steps? <p>Steps: {recipeDetail.steps}</p>: <p>No hay pasos</p>}  */}
                </div> : (<h2>Loading...</h2>)}
            <Link to={'/home'}><button>Go back</button></Link>

        </div>
    )
}