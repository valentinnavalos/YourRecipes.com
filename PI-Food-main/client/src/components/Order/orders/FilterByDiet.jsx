import { useDispatch, useSelector } from 'react-redux';
import { filterByTypesOfDiets, getRecipes} from '../../../redux/actions';
import s from './FilterByDiet.module.css';

export default function FilterByDiet() {

    const { typesOfDiets } = useSelector(state => state);

    const dispatch = useDispatch();

    function handleOnChange(e) {
        e.preventDefault();
        e.target.value === ''
            ? dispatch(getRecipes())
            : dispatch(filterByTypesOfDiets(e.target.value));
    }

    return (
        <div>
            <select onChange={handleOnChange} className={s.orderSelect}>
                <option value={''}>Filter by Diets</option>
                {typesOfDiets.map(type => (
                    <option key={type.id} value={type.name.toLowerCase()}>{type.name[0].toUpperCase() + type.name.slice(1)}</option>
                ))}
            </select>
        </div>
    )
}