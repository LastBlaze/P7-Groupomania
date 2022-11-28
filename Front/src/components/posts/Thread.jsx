import React, { useState, useEffect, Fragment } from "react";
import instance from "../../config/Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import CardPost from "./CardPost";

function Thread(props) {
  return (
    <Fragment>
      <h2 className="underline underline-4 underline-offset-4 text-black text-xl text-center mt-4 font-bold">
        Fil d'actualité :
      </h2>

      <ul className="bg-transparent card shadow-2xl container max-w-xl e">
        {props.data.map((item, key) => {
          // étape 1 : créer un composant postCard
          // étape 2 : afficher les post en important postCard dans le .map et lui donnant le sinfo en props <postCard info=item />
          // créer la carte entiere dans un composant a part
          // dans le composant mettre les state, et le if, si le state est en cour de modification afficher le formulaire, sinon afficher la card

          return (
            <li
              key={key}
              className="mt-4 mb-4 mx-4 rounded-xl border border-white bg-base-100"
            >
              <CardPost item={item} />
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
}

export default Thread;
