import { getRecipes, sortRecipesByScore } from "../../../redux/actions";
import { useDispatch } from "react-redux";
import { HIGHEST, LOWEST } from "../constants/sortByScore";
import s from "./OrderScore.module.css";

export default function OrderScore() {

    const dispatch = useDispatch();

    function handleOnChange(e) {
        e.preventDefault();
        e.target.value === '' ? dispatch(getRecipes()) : dispatch(sortRecipesByScore(e.target.value));
    }

    return (
        <div>
            <select onChange={handleOnChange} className={s.orderSelect}>
                <option value="">Order by Score</option>
                <option value={HIGHEST}>Highest Score</option>
                <option value={LOWEST}>Lowest Score</option>
            </select>
        </div>
    )
}