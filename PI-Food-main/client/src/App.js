import { Route, Switch } from "react-router-dom";
import "./App.css";
import Detail from "./components/detail/Detail";
import Home from "./components/home/Home";
import LandingPage from "./components/landingpage/LandingPage";
import Form from "./components/form/Form";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/recipe/detail/:idRecipe" component={Detail} />
        <Route path={"/recipe/form"} component={Form} />
        {/* <Route exact path={'/recipe/update'} /> */}
      </Switch>
    </div>
  );
}

export default App;
