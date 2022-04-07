import OrderAZ from "./OrderAZ";
import OrderDiet from "./OrderDiet";
import OrderScore from "./OrderScore";

export default function Order() {
    return (
        <div>
            <OrderAZ />
            <OrderScore />
            <OrderDiet />
        </div>
    )
}