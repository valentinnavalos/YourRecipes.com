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
            // console.log('habilitado')
            setButtonDisabled(false);
        } else {
            // console.log('desabilitado')
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
        // console.log(error);
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
        // console.log('handleOnChange', error);
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        setError(validateSearchBar(search));
        if (search && !error) {
            // console.log('handleOnSubmit', search);
            // console.log('errorMsg', errorMsg);
            dispatch(searchRecipes(search));
            setSearch('');
        } else {
            // console.log('error', error);
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