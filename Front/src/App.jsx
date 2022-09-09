import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Routes, Route} from "react-router-dom";
import React, { useState } from "react";

// const App = () => {
//   // const {active, setActive} = useState{"Login"};

//   return (
    
//     <div className="App container flex flex-col justify-start  items-center bg-blue-200 h-screen">
//       <Header/>
//       <Routes>
//         {/* <Route path="/" element={<Login />} />
//         <Route path="/" element={<Signup />} /> */}
//       </Routes>
//         {/* <div>
//         {active=== "Login" &&}
//       </div> */}
//     </div>
  

  export default function App() {
    const {active, setActive} = useState("Login");
    return(
      
      <Routes>
          <Route path="/" element={<Login />} />
          <Header/>
      <div className="App">
        <nav>
        <button onClick={() => setActive("Login")}>Connexion</button>
        <button onClick={() => setActive("Signup")}>Inscription</button>
        </nav>
        <div>
        {active === "Connexion" && <Login title="Login" />}
        {active === "Inscription" && <Signup title="Signup" />}
      </div>
      </div>
      </Routes>
);
};


//export default App;
