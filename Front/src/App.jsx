import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";


import { Routes, Route} from "react-router-dom"

const App = () => {
  return (
    
    <div className="App container h-screen flex flex-col justify-between">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/profil/:id" element={<Profile />} />
      </Routes>
      <header>
        <Header />
      </header>
      <main>
        <Login />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
    
  );
};

export default App;
