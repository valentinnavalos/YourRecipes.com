import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchRecipes } from "../../redux/actions";
// import RecipeList from "../RecipeList/RecipeList";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(searchRecipes(''));
  // }), [];

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = dispatch(searchRecipes(search));
    setRecipes(result);
    setIsLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a recipe"
          value={search}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      {isLoading ? <h2>Loading...</h2> : null}
    </div>
  );
}
