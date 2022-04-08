import OrderAZ from "./OrderAZ";
import FilterByDiet from "./FilterByDiet";
import OrderScore from "./OrderScore";

export default function Order() {
    return (
        <div>
            <OrderAZ />
            <OrderScore />
            <FilterByDiet />
        </div>
    )
}