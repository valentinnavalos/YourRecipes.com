import Cards from "./Cards";
import NavBar from "./NavBar";
import Order from "./Order";
import Reset from "./Reset";
import SearchBar from "./SearchBar";

export default function Home() {
    return (
        <div>
            <NavBar />
            <SearchBar />
            <Reset />
            <Order />
            <h1>Home del PI FOODS.</h1>
            <Cards />
        </div>
    )
}