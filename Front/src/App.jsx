import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import { Routes, Route} from "react-router-dom";
import React from "react";


const App = () => {
// usestate 

  return (
    
    <div className="App container flex flex-col justify-start  items-center bg-blue-400">
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/acceuil" element={<Posts />} />
      </Routes>
      <Footer/>
    </div>
);
};


export default App;
