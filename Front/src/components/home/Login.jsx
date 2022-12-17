import React from "react";
import { useState } from "react";
import instance from "../../config/Axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    instance
      .post("/api/v1/user/login", { email, password }, config)
      .then((response) => {
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        window.location = "http://localhost:3000/acceuil";
      })
      .catch((error) => {
        console.error(error?.response);
        setMessage("Adresse mail ou mot de passe incorrect");
        setError(false);
      });
  };

  return (
    <div className="grid flex-grow h-auto w-full mt-4 card bg-tertiary rounded-box place-items-center border-4 border-white ">
      <div className="hero pt-16 pb-16">
        <div className="hero-content flex-col h-max">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-center text-white">
              Connexion
            </h1>
            <p className="py-6 text-white">
              Connectez-vous à votre réseau d'entreprise !
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form
              onSubmit={submitHandler}
              className="card-body bg-blue-400 border-2 border-white rounded-2xl"
            >
              <div className="form-control">
                <label htmlFor="email" className="label-text text-black flex ">
                  Email :
                </label>
                <input
                  type="text"
                  value={email}
                  placeholder="email"
                  className="input input-bordered border-1 border-black"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label
                  htmlFor="password"
                  className="label-text text-black flex "
                >
                  Mot de passe :
                </label>
                <input
                  type="password"
                  value={password}
                  placeholder="mot de passe"
                  className="input input-bordered border-1 border-black mb-3"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p
                  className={
                    error ? "hidden" : "text-red-700 text-lg font-bold"
                  }
                >
                  {message}
                </p>
                
              </div>
              <div className="form-control mt-6">
                <button
                  variant="primary"
                  className="btn bg-blue-900  border-2 border-white"
                  type="submit"
                >
                  Connexion
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
