import OrderAZ from "./orders/OrderAZ";
import OrderScore from "./orders/OrderScore";
import FilterByDiet from "./orders/FilterByDiet";
import FilterByCreation from "./orders/FilterByCreation";
import s from "./Order.module.css";

export default function Order() {

    return (
        <div className={s.ordersContainer}>
            <span className={s.eachOrder}>
                <OrderAZ />
            </span>
            <span>
                <OrderScore />
            </span>
            <span>
                <FilterByDiet />
            </span>
            <span>
                <FilterByCreation />
            </span>
        </div>
    )
}