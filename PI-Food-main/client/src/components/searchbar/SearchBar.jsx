import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchRecipes } from '../../redux/actions';
import s from './SearchBar.module.css';

export default function SearchBar() {

    const [search, setSearch] = useState('');
    const [error, setError] = useState('Please enter a search term.');
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        if (search && !error) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [search, error]);

    function validateSearchBar(state) {
        let error = '';
        if (!state.length) {
            error = 'Please enter a search term.';
        }
        if (!/^[a-zñá-ú\s]+$/i.test(state)) {
            error = 'Please enter a valid string.';
        }
        return error;
    }

    function handleOnChange(e) {
        e.preventDefault();
        setSearch(() => {

            const handler = e.target.value;

            const newError = validateSearchBar(e.target.value);
            setError(newError);

            return handler;
        });
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        setError(validateSearchBar(search));
        if (search && !error) {
            dispatch(searchRecipes(search));
            setSearch('');
        } else {
            alert(error);
        }
    }

    return (
        <div >
            <form onSubmit={handleOnSubmit} className={s.formContainer}>
                <input
                    type="text"
                    placeholder="Search a recipe.."
                    value={search}
                    onChange={handleOnChange}
                    className={s.searchBarInput}
                />
                <input
                    type="submit"
                    disabled={buttonDisabled}
                    value="Search"
                    className={s.searchBarButton}
                />
            </form>
        </div>
    )
}