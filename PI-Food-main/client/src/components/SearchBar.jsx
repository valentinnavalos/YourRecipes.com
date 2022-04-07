import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchRecipes } from '../redux/actions';

export default function SearchBar() {

    const [search, setSearch] = useState('');

    const dispatch = useDispatch();

    function handleOnChange(e) {
        e.preventDefault();
        setSearch(e.target.value);
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        search.length > 0 ? dispatch(searchRecipes(search)) : alert('Please fill the field.');
        setSearch('');
    }

    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <input type="text" placeholder="Search a recipe.." value={search} onChange={handleOnChange} />
                <input type="submit" value="Search"/>

            </form>
        </div>
    )
}