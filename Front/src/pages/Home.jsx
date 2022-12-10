import React from "react";

import styled from "styled-components";

import Login from "../components/home/Login";
import Signup from "../components/home/Signup";
import { useState } from "react";

const HomeDiv = styled.div`
  margin: 50px 0px 20px 0px;
  text-align: center;
  font-size: 25px;
`;

function DisplayHome() {
  const [page, setPage] = useState("Login");
  return (
    <HomeDiv>
      <nav className="flex justify-evenly">
        <button
          className="border-4 w-2/5 hover:border-tertiary hover:border-4 bg-tertiary text-white hover:font-bold rounded-2xl"
          onClick={() => setPage("Login")}
        >
          Connexion
        </button>
        <button
          className="border-4 w-2/5 hover:border-tertiary hover:border-4 bg-tertiary text-white hover:font-bold rounded-2xl"
          onClick={() => setPage("Signup")}
        >
          Inscription
        </button>
      </nav>
      {page === "Login" && <Login />}
      {page === "Signup" && <Signup />}
    </HomeDiv>
  );
}
export default DisplayHome;
