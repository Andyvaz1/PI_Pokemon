import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Land } from "./components/land";
import { Home } from "./components/home";
import { NavBar } from "./components/navBar";
import { PokeDetail } from "./components/pokeDetail";
import { PokeCreate } from "./components/pokeCreate";

function App(props) {
    return (
        <div>
            <Switch>
                <Route path="/" exact render={() => <Land />} />
            </Switch>
            <Route
                render={({ location }) => {
                    if (location.pathname !== "/") return <NavBar />;
                }}
            />
            <Switch>
                <Route path="/home" exact render={() => <Home />} />
                <Route
                    path="/pokemoncreate"
                    exact
                    render={() => <PokeCreate />}
                />
                <Route path="/:id" exact render={() => <PokeDetail />} />
            </Switch>
        </div>
    );
}

export default App;
