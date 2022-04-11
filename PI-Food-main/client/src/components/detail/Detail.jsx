import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearDetail, getRecipeDetail } from "../../redux/actions";
// import NavBar from "../navbar/NavBar";
import s from "./Detail.module.css";

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
        <div>
            {recipeDetail.title ?

                <div className={s.detailContainer}>
                    <div className={s.detailHeader}>
                        <h2>{recipeDetail.title}</h2>
                        <Link to={'/home'} className={s.linkButton}>
                            <button className={s.button}>Home</button>
                        </Link>
                    </div>
                    <div className={s.firstContainer}>
                        <div className={s.imgContainer}>
                            <img src={recipeDetail.image} alt="No Image Available" className={s.imgContainer}/>
                        </div>
                        <div className={s.scoresContainer}>
                            {recipeDetail.spoonacularScore ? <p className={s.scoresText}>Spoonacular Score: {recipeDetail.spoonacularScore}</p> : <p>No score available.</p>}
                            {recipeDetail.healthScore ? <p className={s.scoresText}>Health Score: {recipeDetail.healthScore}</p> : <p>No score available.</p>}
                            <div className={s.dietsContainer}>
                                <p className={s.dietsTitle}>Diets:</p>
                                <ul className={s.dietsList}>
                                    {recipeDetail.diets?.length ?
                                        recipeDetail.diets.map(el => {
                                            return (<li
                                                key={el}
                                                className={s.dietsText}
                                            >{el}</li>)
                                        }) :
                                        <p>There are no types of diets.</p>}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={s.infoContainer}>
                        <h3>Summary:</h3>
                        <p
                            dangerouslySetInnerHTML={{ __html: recipeDetail.summary }}
                        ></p>
                    </div>
                    <div className={s.infoContainer}>
                        <h3>Steps:</h3>
                        <ol>
                            {recipeDetail.steps?.length ? recipeDetail.steps.map(el => {
                                return (
                                    <li key={el.number}>{el.step}</li>
                                )
                            }) : <p>There are no steps to show.</p>}
                        </ol>
                    </div>
                </div> : (<p>Loading...</p>)}
            {/* <Link to={'/home'}><button>Go back</button></Link> */}
        </div>
    )
}