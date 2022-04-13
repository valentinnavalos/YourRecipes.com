import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, getTypesOfDiets } from "../../redux/actions";
import Cards from "../cards/Cards";
import NavBar from "../navbar/NavBar";
import Order from "../order/Order";
import Pagination from "../pagination/Pagination";
import s from "./Home.module.css";

export default function Home() {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);

    const [loaded, setLoaded] = useState(false);

    const { filteredRecipes, typesOfDiets } = useSelector(state => state);

    useEffect(() => {
        if (!typesOfDiets.length) {
            Promise.all([dispatch(getRecipes()), dispatch(getTypesOfDiets())])
                .then(() => setLoaded(true));
        } else {
            dispatch(getRecipes()).then(() => setLoaded(true));
        }
    }, [dispatch]);

    useEffect(() => {
        setCurrentPage(1);
    }, [filteredRecipes])

    function paginate(numberOfPage) {
        setCurrentPage(numberOfPage)
    }

    const indexOfLastRecipe = currentPage * itemsPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;
    const currentRecipes = filteredRecipes?.slice(indexOfFirstRecipe, indexOfLastRecipe);

    return (
        <div>
            <NavBar />
            {loaded ? (

                <div className={s.homePageContainer}>
                    <div className={s.ordersContainer}>
                        <Order />
                    </div>
                    <div className={s.cardsContainer}>
                        {currentRecipes.length ? (
                            <div>
                                <Cards currentRecipes={currentRecipes} />
                                <div className={s.paginateContainer}>
                                    <Pagination
                                        lengthAllRecipes={filteredRecipes.length}
                                        paginateFn={paginate}
                                        itemsPerPage={itemsPerPage}
                                        currentPage={currentPage}
                                    />
                                </div>
                            </div>
                        ) : (
                            <span className={s.notFound} >Recipe not found.</span>
                        )}
                    </div>

                </div>
            ) : (
                <span className={s.loading}>Loading...</span>
            )})
        </div>
    )
}