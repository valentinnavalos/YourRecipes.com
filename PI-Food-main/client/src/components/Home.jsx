import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, getTypesOfDiets } from "../redux/actions";
import Cards from "./Cards";
import NavBar from "./NavBar";
import Order from "./Order";
import Pagination from "./Pagination";
import Reset from "./Reset";
import SearchBar from "./SearchBar";

export default function Home() {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);

    const { filteredRecipes } = useSelector(state => state);

    useEffect(() => {
        dispatch(getRecipes());
        dispatch(getTypesOfDiets())
    }, [dispatch]);

    function paginate(numberOfPage) {
        setCurrentPage(numberOfPage)
    }

    const indexOfLastRecipe = currentPage * itemsPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;
    const currentRecipes = filteredRecipes?.slice(indexOfFirstRecipe, indexOfLastRecipe);
    // console.log(currentRecipes);
    return (
        <div>
            <NavBar />
            <SearchBar />
            <Reset />
            <Order />
            <h1>Home del PI FOODS.</h1>
            {currentRecipes.length?<Cards currentRecipes={currentRecipes} />: <span>Recipe not found.</span>}
            {/* <Cards currentRecipes={currentRecipes} /> */}
            <Pagination
                lengthAllRecipes={filteredRecipes.length}
                paginateFn={paginate}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
            />
        </div>
    )
}