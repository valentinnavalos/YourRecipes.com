import { Route, Switch } from "react-router-dom";
import "./App.css";
import Detail from "./components/Detail";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import Form from "./components/Form/Form";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/recipeDetail/:idRecipe" component={Detail} />
        <Route exact path={"/create"} component={Form} />
      </Switch>
    </div>
  );
}

export default App;
