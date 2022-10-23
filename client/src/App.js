import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Land } from "./components/land";
import { Home } from "./components/home";
import { PokeDetail } from "./components/pokeDetail";

function App(props) {
    return (
        <div>
            <Switch>
                <Route path="/" exact render={() => <Land />} />
            </Switch>
            <Switch>
                <Route path="/home" exact render={() => <Home />} />
                <Route path="/:id" exact render={() => <PokeDetail />} />
            </Switch>
        </div>
    );
}

export default App;
