import { Link } from "react-router-dom";

export default function Card({ title, image, id , diets}) {

    return (
        <div className="card">
            <Link to={`/recipeDetail/${id}`}>
                <h4>{title}</h4>
            </Link>
            <br />
            <img src={image} alt={title} width='450px' height={'350px'}/>
            <h5>{diets?.join(', ')}</h5>

        </div>
    )
}