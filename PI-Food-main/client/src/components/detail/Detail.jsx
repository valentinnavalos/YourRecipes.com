import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { clearDetail, deleteRecipeFromDb, getRecipeDetail } from "../../redux/actions";
import s from "./Detail.module.css";

export default function Detail() {

    const { idRecipe } = useParams();
    const { recipeDetail } = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!recipeDetail.id) {
            dispatch(getRecipeDetail(idRecipe));
            setLoaded(true);
        }
        return () => {
            dispatch(clearDetail());
        }
    }, [dispatch, idRecipe]);

    function deleteRecipe(e) {
        e.preventDefault();
        //falta un alerta de si está segur@ de eliminar la receta
        dispatch(deleteRecipeFromDb(idRecipe));
        alert('The recipe has been deleted.');
        history.push("/home");
    }

    return (
        <div>
            {loaded ? (

                <div>
                    {recipeDetail.title ?

                        <div className={s.detailContainer}>
                            <div className={s.detailHeader}>
                                <h2 className={s.titleHeader}>{recipeDetail.title}</h2>
                                <Link to={'/home'} className={s.linkButton}>
                                    <button className={s.button}>Home</button>
                                </Link>
                            </div>
                            <div className={s.firstContainer}>
                                <div className={s.imgContainer}>
                                    <img src={recipeDetail.image} alt="No img available" className={s.imgContainer} />
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
                            {recipeDetail.createdInDb ?
                                <div className={s.lastContainer}>
                                    <button onClick={deleteRecipe} className={s.lastButtons}>Delete recipe</button>
                                </div>
                                : null}


                        </div> : (<p className={s.loading}>Loading...</p>)}
                </div>
            ) : (<span className={s.loading}>Loading...</span>)}
        </div>
    )
}