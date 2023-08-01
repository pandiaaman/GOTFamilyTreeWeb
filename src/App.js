import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./prac/Navbar";
import TreeHome from "./prac/TreeHome";
import CharHome from "./prac/CharHome";
import GotHome from "./prac/GotHome";
import Favourites from "./prac/Favourites";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/housetree/:houseName" element={<TreeHome />} />
          <Route path="/gothome" element={<GotHome />} />
          <Route path="/" element={<GotHome />} />
          <Route
            exact
            path="/characterinfo/:characterId"
            element={<CharHome />}
          />
          <Route exact path="/allfavourites" element={<Favourites />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
