import React from "react";

function Logout() {
  return (
    <form className="pt-40 text-center lg:p-0 lg:text-right lg:mr-20">
      <button
        className="btn rounded-3xl bg-base-100 hover:text-red-500 text-white"
        onClick={(e) => {
          e.preventDefault();
          localStorage.removeItem("userInfo");
          window.location = "http://localhost:3000/";
        }}
      >
        Déconnexion
      </button>
    </form>
  );
}

export default Logout;
