import { useDispatch } from "react-redux";
import { getRecipes, sortRecipes } from "../redux/actions";
import { ASCENDENTE, DESCENDENTE } from "./Order/constants/sort";

export default function OrderAZ() {

    const dispatch = useDispatch();

    function handleOnChange(e) {
        e.preventDefault();
        e.target.value === '' ? dispatch(getRecipes()) : dispatch(sortRecipes(e.target.value));
    }

    return (
        <div>
            <select name="select" onChange={handleOnChange}>
                <option value="">Order by Name</option>
                <option value={ASCENDENTE}>A-Z</option>
                <option value={DESCENDENTE}>Z-A</option>
            </select>
        </div>
    )
}