import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./config/PrivateRoute";

const App = () => {
  return (
    <div className="App container flex flex-col justify-start  items-center bg-blue-400">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/acceuil" element={<PrivateRoute />}>
          <Route path="" element={<Posts />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
