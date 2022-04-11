import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, getTypesOfDiets } from "../../redux/actions";
import Cards from "../cards/Cards";
import NavBar from "../navbar/NavBar";
import Order from "../order/Order";
import Pagination from "../pagination/Pagination";
// import Reset from "../order/orders/Reset";
// import SearchBar from "../searchbar/SearchBar";
import s from "./Home.module.css";

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
            <div className={s.homePageContainer}>
                <div className={s.ordersContainer}>
                    <Order />
                </div>
                <div className={s.cardsContainer}>
                    {currentRecipes.length ? <Cards currentRecipes={currentRecipes} /> : <span>Recipe not found.</span>}
                    {/* <Cards currentRecipes={currentRecipes} /> */}
                </div>
                <div className={s.paginateContainer}>
                    <Pagination
                        lengthAllRecipes={filteredRecipes.length}
                        paginateFn={paginate}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                    />
                </div>

            </div>
        </div>
    )
}