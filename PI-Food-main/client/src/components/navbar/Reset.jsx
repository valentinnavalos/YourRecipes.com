import { useDispatch } from 'react-redux';
import { getRecipes } from '../../redux/actions';

export default function Reset() {
    const dispatch = useDispatch();

    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes())
    }
    return (
        <div>
            <button onClick={handleClick}>Reset Home</button>
        </div>
    )
}