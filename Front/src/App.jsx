import Header from "./components/Header";
import Home from "./pages/Home";
import { Routes, Route} from "react-router-dom";
import React from "react";

const App = () => {
  // const {active, setActive} = useState{"Login"};

  return (
    
    <div className="App container flex flex-col justify-start  items-center bg-blue-400 h-screen">
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
        {/* <div>
        {active=== "Login" &&}
      </div> */}
    </div>
  

  /*export default function App() {
    const {active, setActive} = useState("Login");
    return(
      <div className="App">
        <nav>
        <button onClick={() => setActive("Login")}>Connexion</button>
        <button onClick={() => setActive("Signup")}>Inscription</button>
        </nav>
        <div>
        {active === "Connexion" && <Login title="Login" />}
        {active === "Inscription" && <Signup title="Signup" />}
      </div>
      </div>*/
      
);
};


export default App;
