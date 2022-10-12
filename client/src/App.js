import { Route } from "react-router-dom";
import LandingPage from "../src/components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import Created from './components/Created/Created'
import "./App.css";

function App() {
  return (
    <div>
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/create">
        <Created />
      </Route>
    </div>
  );
}

export default App;
