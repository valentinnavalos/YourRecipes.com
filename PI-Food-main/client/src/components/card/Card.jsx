import { Link } from "react-router-dom";
import s from "./Card.module.css";

export default function Card({ title, image, id, diets }) {

    return (
        <div className={s.cardContainer}>
            <Link to={`/recipeDetail/${id}`}>
                <h4 className={s.cardTitle}>{title}</h4>
            </Link>
            <img src={image} alt={title} className={s.cardImage}/>
            <h5 className={s.cardDiets}>{diets?.join(', ')}</h5>

        </div>
    )
}