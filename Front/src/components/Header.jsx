import Logo from "../assets/images/icon-left-font-monochrome-white.svg";
import React from "react";
import Logout from "../components/home/Logout";
import { useLocation } from "react-router-dom";

const Header = (props) => {
  const { pathname } = useLocation();
  return (
    <div className="navbar  bg-tertiary border-b-4">
      <div className="container justify-center">
        <img className="h-full w-96 " src={Logo} alt="Logo" />
        {pathname !== "/" && (
          <div className="absolute text-right container">
            <Logout />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
