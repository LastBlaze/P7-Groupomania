import React from "react";

const Login = () => {
  return (
      <div className="grid flex-grow h-auto w-full mt-4 card bg-tertiary rounded-box place-items-center border-4 border-white ">
        <div className="hero pt-16 pb-16">
          <div className="hero-content flex-col h-max">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold text-center text-white">Connexion</h1>
              <p className="py-6 text-white">
                Connectez-vous à votre réseau d'entreprise !
              </p>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body bg-blue-400 border-2 border-white rounded-2xl">
                <div className="form-control">
               
                  <input
                    type="text"
                    placeholder="email"
                    className="input input-bordered border-1 border-black"
                  />
                </div>
                <div className="form-control">
                  
                  <input
                    type="text"
                    placeholder="mot de passe"
                    className="input input-bordered border-1 border-black"
                  />
                  <label className="label">
                    <a href="/login" className="label-text-alt link link-hover underline underline-offset-2 text-base">
                      Mot de passe oublié ?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn bg-blue-900  border-2 border-white ">Connexion</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Login;