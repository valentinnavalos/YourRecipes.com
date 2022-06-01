// import OrderAZ from "./orders/OrderAZ";
// import OrderScore from "./orders/OrderScore";
// import FilterByDiet from "./orders/FilterByDiet";
// import FilterByCreation from "./orders/FilterByCreation";
import s from "./Order.module.css";
import { useDispatch, useSelector } from "react-redux";
import { filterByCreation, filterByTypesOfDiets, getRecipes, sortRecipes, sortRecipesByScore } from "../../redux/actions";
// import { Link } from "react-router-dom";
// import { useState } from "react";
import { ASCENDENTE, DESCENDENTE } from "./constants/sort";
import { HIGHEST, LOWEST } from "./constants/sortByScore";

export default function Order() {
    // const [reseted, setReseted] = useState(false);
    const dispatch = useDispatch();
    const { typesOfDiets } = useSelector(state => state);

    function handleOnChange(e) {
        //poner a por default todos los filtros
        switch (e.target.name) {
            case 'orderName': {
                // if (reseted) {
                //     e.target.value = '';
                //     return setReseted(false);
                // } else {
                    if (!e.target.value) return dispatch(getRecipes());
                    else {
                        // setReseted(false);
                        return dispatch(sortRecipes(e.target.value));
                    }
                // }
            }
            case 'orderScore': {
                if (!e.target.value) return dispatch(getRecipes());
                else {
                    // setReseted(false);
                    return dispatch(sortRecipesByScore(e.target.value));
                }
            }
            case 'filterDiets': {
                if (!e.target.value) return dispatch(getRecipes());
                else {
                    // setReseted(false);
                    return dispatch(filterByTypesOfDiets(e.target.value));
                }
            }
            case 'filterCreation': {
                if (!e.target.value) return dispatch(getRecipes());
                else {
                    // setReseted(false);
                    return dispatch(filterByCreation(e.target.value));
                }
            }
            default: {
                // setReseted(true);
                return dispatch(getRecipes())
            }

        }
    }

    // function handleReset(e) {
    //     e.preventDefault();
    //     setReseted(true);
    //     handleOnChange({ target: { name: 'orderName', value: '' } });
    //     dispatch(getRecipes());
    // }

    return (
        <div className={s.ordersContainer}>
            {/* <div>
                <button onClick={handleReset}>Reset all</button>
            </div> */}
            {/* <div className={s.orderContainer}> */}
            <span className={s.eachOrder}>
                {/* <OrderAZ /> */}
                <select name="orderName" onChange={handleOnChange} className={s.orderSelect}>
                    <option value="" >Order by Name</option>
                    <option value={ASCENDENTE} >A-Z</option>
                    <option value={DESCENDENTE} >Z-A</option>
                </select>
            </span>
            <span>
                {/* <OrderScore /> */}
                <select name='orderScore' onChange={handleOnChange} className={s.orderSelect}>
                    <option value="">Order by Score</option>
                    <option value={HIGHEST} >Highest Score</option>
                    <option value={LOWEST} >Lowest Score</option>
                </select>
            </span>
            <span>
                {/* <FilterByDiet /> */}
                <select name='filterDiets' onChange={handleOnChange} className={s.orderSelect}>
                    <option value={''}>Filter by Diets</option>
                    {typesOfDiets.map(type => (
                        <option key={type.id} value={type.name.toLowerCase()} >{type.name[0].toUpperCase() + type.name.slice(1)}</option>
                    ))}
                </select>
            </span>
            <span>
                {/* <FilterByCreation /> */}
                <select name='filterCreation' onChange={handleOnChange} className={s.orderSelect}>
                    <option value={''}>Filter by creation</option>
                    <option value={'api'} >From api</option>
                    <option value={'db'} >From database</option>
                </select>
            </span>
            {/* </div> */}
        </div>
    )
}