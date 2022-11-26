import React from "react";
import { useState } from "react";
import instance from "../../config/Axios";

const Signup = () => {
  const [lastName, setLastName] = useState("");
  const [lastMessage, setLastMessage] = useState("");
  const [lastError, setLastError] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [firstMessage, setFirstMessage] = useState("");
  const [firstError, setFirstError] = useState(false);

  const [email, setEmail] = useState("");
  const [mailMessage, setMailMessage] = useState("");
  const [mailError, setMailError] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmError, setConfirmError] = useState(false);

  const [emailUsed, setEmailUsed] = useState("");

  const lastValidation = (lastValue) => {
    const regEx =
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{3,}$/m;
    if (regEx.test(lastValue) === true) {
      setLastMessage();
      setLastError(false);
    }
    if (!regEx.test(lastValue) || lastValue === "") {
      setLastMessage("Nom invalide");
      setLastError(true);
    }
  };

  const firstValidation = (firstValue) => {
    const regEx =
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{3,}$/m;
    if (regEx.test(firstValue) === true) {
      setFirstMessage();
      setFirstError(false);
    }

    if (!regEx.test(firstValue) || firstValue === "") {
      setFirstMessage("Prénom invalide");
      setFirstError(true);
    }
  };

  const emailValidation = (emailValue) => {
    const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/m;
    if (regEx.test(emailValue) === true) {
      setMailMessage();
      setMailError(false);
    }
    if (!regEx.test(emailValue) || emailValue === "") {
      setMailMessage("Adresse mail invalide");
      setMailError(true);
    }
  };

  const passwordValidation = (passwordValue) => {
    const regEx = /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/m;
    if (regEx.test(passwordValue) === true) {
      setPasswordMessage();
      setPasswordError(false);
    }
    if (regEx.test(passwordValue) === false || passwordValue === "") {
      setPasswordMessage(
        "8 caractères dont 1 majuscule, 1 minuscule et 1 caractère spéciale"
      );
      setPasswordError(true);
    }
  };

  const confirmValidation = (confirmValue) => {
    if (confirmValue === password) {
      setConfirmError(false);
      setConfirmPassword(confirmValue);
    }
    if (confirmValue !== password) {
      setConfirmMessage(
        "Le mot de passe et la confirmation ne correspondent pas !"
      );
      setConfirmError(true);
      setConfirmPassword("");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Les mots de passe ne sont pas identique");
      return;
    }

    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      const { data } = await instance.post(
        "/api/v1/user/signup",
        {
          email,
          password,
          lastName,
          firstName,
        },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      window.location = "http://localhost:3000";
    } catch (error) {
      if (error.response.data) {
        setEmailUsed(error.response.data);
      }
    }
  };

  return (
    <div className="signup grid flex-grow h-auto mt-4  w-full card bg-tertiary rounded-box place-items-center border-4 border-white">
      <div className="hero">
        <div className="hero-content flex-col ">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-center text-white">
              Inscription
            </h1>
            <p className="py-6 text-white">
              Inscrivez-vous à votre réseau d'entreprise !
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form
              onSubmit={submitHandler}
              className="card-body bg-blue-400 border-2 border-white rounded-2xl"
            >
              <div className="form-control">
                <label
                  htmlFor="lastName"
                  className="label-text text-black flex "
                >
                  Nom :
                </label>
                <input
                  name="lastName"
                  type="name"
                  value={lastName}
                  placeholder="Nom"
                  className="input input-bordered border-1 border-black"
                  onChange={(e) => {
                    setLastName(e.target.value);
                    lastValidation(e.target.value);
                  }}
                />
                <p
                  className={
                    lastError ? "text-red-700 text-lg font-bold" : "hidden"
                  }
                >
                  {lastMessage}
                </p>
              </div>

              <div className="form-control">
                <label
                  htmlFor="firstName"
                  className=" label-text text-black  flex "
                >
                  Prénom :
                </label>
                <input
                  name="firstName"
                  type="text"
                  value={firstName}
                  placeholder="Prénom"
                  className="input input-bordered border-1 border-black"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    firstValidation(e.target.value);
                  }}
                />
                <p
                  className={
                    firstError ? "text-red-700 text-lg font-bold" : "hidden"
                  }
                >
                  {firstMessage}
                </p>
              </div>

              <div className="form-control">
                <label htmlFor="email" className="label-text text-black flex">
                  Email :
                </label>
                <input
                  name="email"
                  type="email"
                  value={email}
                  placeholder="email"
                  className="input input-bordered border-1 border-black"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    emailValidation(e.target.value);
                  }}
                />
                <p
                  className={
                    mailError ? "text-red-700 text-lg font-bold" : "hidden"
                  }
                >
                  {mailMessage}
                </p>
              </div>

              <div className="form-control">
                <label
                  htmlFor="password"
                  className="label-text text-black  flex"
                >
                  Mot de passe :
                </label>
                <input
                  name="password"
                  type="password"
                  value={password}
                  placeholder="mot de passe"
                  className="input input-bordered border-1 border-black"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    passwordValidation(e.target.value);
                  }}
                />
                <p
                  className={
                    passwordError
                      ? "text-red-700 text-base font-bold"
                      : "hidden"
                  }
                >
                  {passwordMessage}
                </p>
              </div>

              <div className="form-control">
                <label
                  htmlFor="confirmpassword"
                  className="label-text text-black  flex"
                >
                  Confirmation mot de passe :
                </label>
                <input
                  name="confirmpassword"
                  type="password"
                  placeholder="Confirmation mot de passe"
                  className="input input-bordered border-1 border-black"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    confirmValidation(e.target.value);
                  }}
                />
                <p
                  className={
                    confirmError ? "text-red-700 text-base font-bold" : "hidden"
                  }
                >
                  {confirmMessage}
                </p>
              </div>

              <div className="form-control mt-6">
                <p
                  className={
                    emailUsed === ""
                      ? "hidden"
                      : "text-red-700 text-lg font-bold"
                  }
                >
                  {emailUsed}
                </p>
                <button
                  variant="primary"
                  className="btn bg-blue-900 border-2 border-white"
                  type="submit"
                  disabled={
                    !lastName ||
                    lastError ||
                    !firstName ||
                    firstError ||
                    !email ||
                    mailError ||
                    !password ||
                    passwordError ||
                    !confirmPassword ||
                    confirmError
                      ? true
                      : false
                  }
                >
                  Inscription
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

// let posts
// posts.forEach(post => {
//   post.user.lastName

// });
// publication.user.firstName
// publication.user.lastName
