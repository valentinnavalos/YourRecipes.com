import { Route, Switch } from "react-router-dom";
import "./App.css";
import Detail from "./components/Detail";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import NewRecipe from "./components/NewRecipe";
// import Detail from "./components/Detail";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/recipeDetail/:idRecipe" component={Detail} />
        <Route exact path={"/create"} component={NewRecipe} />
      </Switch>
    </div>
  );
}

export default App;
