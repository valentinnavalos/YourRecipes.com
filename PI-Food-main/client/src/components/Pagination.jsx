import { useState } from "react";

export default function Pagination({ lengthAllRecipes, paginateFn, itemsPerPage, currentPage }) {

    const [disabledPrevButton, setDisabledPrevButton] = useState(true);
    const [disabledNextButton, setDisabledNextButton] = useState(false);

    function previousPageButton() {
        if (currentPage > 1) {
            console.log(currentPage)
            setDisabledPrevButton(false);
            paginateFn(currentPage - 1);
            if (disabledNextButton) {
                setDisabledNextButton(false)
            }
        } else {
            setDisabledPrevButton(true);
        }
    }

    function nextPageButton() {
        if (currentPage < pageNumbers.length) {
            console.log(currentPage)
            paginateFn(currentPage + 1);
            setDisabledNextButton(false)
            if (disabledPrevButton) {
                setDisabledPrevButton(false)
            }
        } else {
            setDisabledNextButton(true)
        }
    }

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(lengthAllRecipes / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <button onClick={previousPageButton} disabled={disabledPrevButton}>Prev</button>
            {pageNumbers?.map(el => {
                return (
                    <span key={el}>{el}</span>
                )
            })}
            <button onClick={nextPageButton} disabled={disabledNextButton}>Next</button>
        </div>
    )
}