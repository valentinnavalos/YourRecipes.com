import { getRecipes, sortRecipesByScore } from "../redux/actions";
import { useDispatch } from "react-redux";
import { HIGHEST, LOWEST } from "./Order/constants/sortByScore";

export default function OrderScore() {

    const dispatch = useDispatch();

    function handleOnChange(e) {
        e.preventDefault();
        e.target.value === '' ? dispatch(getRecipes()) : dispatch(sortRecipesByScore(e.target.value));
    }

    return (
        <div>
            <select onChange={handleOnChange}>
                <option value="">Order by Score</option>
                <option value={HIGHEST}>Highest Score</option>
                <option value={LOWEST}>Lowest Score</option>
            </select>
        </div>
    )
}