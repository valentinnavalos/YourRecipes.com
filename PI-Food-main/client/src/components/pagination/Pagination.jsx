import { useState } from "react";
import s from "./Pagination.module.css";

export default function Pagination({ lengthAllRecipes, paginateFn, itemsPerPage, currentPage }) {

    const [disabledPrevButton, setDisabledPrevButton] = useState(true);
    const [disabledNextButton, setDisabledNextButton] = useState(false);

    function previousPageButton() {
        if (parseInt(currentPage) > 1) {
            setDisabledPrevButton(false);
            paginateFn(parseInt(currentPage) - 1);
            if (disabledNextButton) {
                setDisabledNextButton(false)
            }
        } else {
            setDisabledPrevButton(true);
        }
    }

    function nextPageButton() {
        if (parseInt(currentPage) < pageNumbers.length) {
            paginateFn(parseInt(currentPage) + 1);
            setDisabledNextButton(false)
            if (disabledPrevButton) {
                setDisabledPrevButton(false)
            }
        } else {
            setDisabledNextButton(true)
        }
    }

    function handleOnClick(e) {
        e.preventDefault();
        paginateFn(e.target.innerText);
    }

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(lengthAllRecipes / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={s.mainContainer}>
            <button
                onClick={previousPageButton}
                disabled={disabledPrevButton}
                className={s.paginationBtn}>Prev</button>
            <div className={s.numContainer}>
                {pageNumbers?.map(el => {
                    return (
                        <span
                            key={el}
                            className={s.pageNumber}
                            name={el}
                            onClick={handleOnClick}
                            value={el}
                        >{el}</span>
                    )
                })}
            </div>
            <button
                onClick={nextPageButton}
                disabled={disabledNextButton}
                className={s.paginationBtn}>Next</button>
        </div>
    )
}