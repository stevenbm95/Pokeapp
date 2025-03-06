import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./components/home/Home.jsx";
import List from "./components/list/List.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Home/>} />
      <Route path="/list" element={ <List/>} />
    </Routes>
  );
}

export default App;
