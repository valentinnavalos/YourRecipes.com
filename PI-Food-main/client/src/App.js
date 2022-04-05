import { Route, Switch } from "react-router-dom";
import "./App.css";
import Favorites from "./components/Favorites";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import RecetaDetail from "./components/RecetaDetail";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/favorites" component={Favorites} />
        <Route exact path="/recipes/:id" component={RecetaDetail} />
      </Switch>
    </div>
  );
}

export default App;
