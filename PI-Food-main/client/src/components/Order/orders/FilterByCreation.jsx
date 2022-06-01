import { useDispatch } from "react-redux"
import { filterByCreation, getRecipes } from "../../../redux/actions";
import s from './FilterByCreation.module.css';

export default function FilterByCreation() {

    const dispatch = useDispatch();

    function handleOnChange(e) {
        e.target.value === '' ? dispatch(getRecipes()) : dispatch(filterByCreation(e.target.value));
    }

    return (
        <div>
            <select onChange={handleOnChange} className={s.orderSelect}>
                <option value={''}>Filter by creation</option>
                <option value={'api'}>From api</option>
                <option value={'db'}>From database</option>
            </select>
        </div>
    )
}
