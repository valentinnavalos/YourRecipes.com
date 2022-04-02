import { Route } from "react-router-dom";
import "./App.css";
import Favoritos from "./components/Favoritos";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import RecetaDetail from "./components/RecetaDetail";
import CreateRecipe from "./components/CreateRecipe";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Route path={"/"} exact render={() => <Home />} />
      <Route path={"/favorites"} render={() => <Favoritos />} />
      <Route path={"/recipes/:idReceta"} render={() => <RecetaDetail />} />
      <Route path={"/recipe"} render={() => <CreateRecipe />} />
    </div>
  );
}

export default App;
