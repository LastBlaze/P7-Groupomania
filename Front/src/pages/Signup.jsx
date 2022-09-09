import React from "react";

const Signup = () => {
  return (

<div className="signup grid flex-grow h-auto mx-5 w-full card bg-tertiary rounded-box place-items-center border-4 border-white">
      <div className="hero">
  <div className="hero-content flex-col ">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold text-center text-white">Inscription</h1>
      <p className="py-6 text-white" >Inscrivez-vous à votre réseau d'entreprise !</p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body bg-blue-400 border-2 border-white rounded-2xl">
      <div className="form-control">
          
          <input type="text" placeholder="Nom" className="input input-bordered border-1 border-black" />
        </div>
        <div className="form-control">

        <input type="text" placeholder="Prénom" className="input input-bordered border-1 border-black" />
        </div>
        <div className="form-control">
          
          <input type="text" placeholder="email" className="input input-bordered border-1 border-black" />
        </div>

        <div className="form-control">
          
          <input type="text" placeholder="mot de passe" className="input input-bordered border-1 border-black" />
        </div>

        <div className="form-control">
          
          <input type="text" placeholder="Confirmation mot de passe" className="input input-bordered border-1 border-black" />
        </div>

        <div className="form-control mt-6">
          <button className="btn bg-blue-900 border-2 border-white">Inscription</button>
        </div>
      </div>
    </div>
  </div>
</div>
      </div>

);
};

export default Signup;