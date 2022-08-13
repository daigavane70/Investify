import { Route, Routes } from "react-router-dom";
import "./App.css";
import AllStartups from "./pages/AllStartups";
import Bids from "./pages/Bids";
import Home from "./pages/Home";
import Messaging from "./pages/Messaging";

function App() {
  return (
    <div className="App">
      <nav></nav>
      <>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </>
      <Routes>
        <Route path="/all" element={<AllStartups></AllStartups>}></Route>
        <Route path="/bids" element={<Bids></Bids>}></Route>
        <Route path="/messaging" element={<Messaging></Messaging>}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
