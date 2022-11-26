import React, { useState, useEffect, Fragment } from "react";
import instance from "../../config/Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import LikeButton from "./LikeButton";

function CardPost(props) {
  const item = props.item;
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpadate] = useState(null);

  function refreshPage() {
    window.location.reload(false);
  }

  const userInfo = JSON.parse(localStorage.userInfo);
  const option = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  };
  const hoursOpt = { hour: "2-digit", minute: "2-digit", hourCycle: "h23" };
  let date = new Date(item.createdAt).toLocaleDateString(undefined, option);

  const updatePost = (event) => {
    if (textUpdate) {
      event.preventDefault();

      const formData = new FormData(event.target);
      instance
        .patch(`http://localhost:3001/api/v1/msg/${props.item._id}`, formData, {
          method: "patch",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.res(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setIsUpdated(false);
  };

  function postDelete(event) {
    event.preventDefault();
    // const formDelete = new formDelete(event.target);
    instance
      .delete(
        `http://localhost:3001/api/v1/msg/${props.item._id}`,
        postDelete,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Fragment>
      {isUpdated == false ? (
        <div>
          <div className="card-body">
            <div className="flex justify-end ">
              <p className="underline underline-4 underline-offset-4">
                Posté par : {item.user.lastName} {item.user.firstName}
              </p>
              {(userInfo.userId === item.user._id || userInfo.role == true) && (
                <div className="button-container flex">
                  <div onClick={() => setIsUpdated(!isUpdated)}>
                    <FontAwesomeIcon
                      className="mr-5 hover:text-blue-500 cursor-pointer"
                      icon={faPenToSquare}
                    ></FontAwesomeIcon>
                  </div>

                  <div onClick={postDelete}>
                    <FontAwesomeIcon
                      className="hover:text-red-500 mt-1 cursor-pointer"
                      icon={faTrash}
                      onClick={refreshPage}
                    ></FontAwesomeIcon>
                  </div>
                </div>
              )}
            </div>
          </div>
          <p className="pl-10 mb-5">{item.description}</p>
          {item.imageUrl && (
            <figure>
              <img className="h-72" src={item.imageUrl} alt="Shoes" />
            </figure>
          )}

          <div className="flex justify-center">
            <LikeButton item={props} />
          </div>
          <div className="text-center mb-3">Posté le {date}</div>
        </div>
      ) : (
        <form onSubmit={updatePost}>
          <div className="card-body">
            <div className="flex justify-end ">
              <p className="underline underline-4 underline-offset-4">
                Posté par : {item.user.lastName} {item.user.firstName}
              </p>
              {(userInfo.userId == item.user._id || userInfo.role == true) && (
                <div className="button-container flex">
                  <div onClick={() => setIsUpdated(!isUpdated)}>
                    <FontAwesomeIcon
                      className="mr-5 text-blue-500 cursor-pointer"
                      icon={faPenToSquare}
                    ></FontAwesomeIcon>
                  </div>

                  <div onClick={postDelete}>
                    <FontAwesomeIcon
                      className="hover:text-red-500 mt-1 cursor-pointer"
                      icon={faTrash}
                    ></FontAwesomeIcon>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="pl-5 pr-5">
            <div className="update-post">
              <textarea
                defaultValue={item.description}
                // type="text"
                className="flex-1
                  form-control
                  block
                  w-full
                  h-16
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded-t-3xl
                  transition
                  ease-in-out
                  mb-4
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                name="description"
                onChange={(e) => setTextUpadate(e.target.value)}
              ></textarea>
              <label htmlFor="btnValiderPut"></label>

              <figure className="flex flex-wrap-reverse">
                <img className="h-72" src={item.imageUrl} />
                <label htmlFor="image"></label>
                <input
                //  defaultValue={item.imageUrl}
                  onChange={(e) => setTextUpadate(e.target.value)}
                  type="file"
                  name="image"
                  id="image"
                  accept="image/"
                  className="p-5"
                />
              </figure>
              <input
                name="btnValiderPut"
                type="submit"
                className="btn border-10 border-white rounded-none rounded-b-3xl bg-base-100 w-full text-gray-300 mt-3 mb-3"
                value="valider modification"
                onClick={refreshPage}
              />
            </div>
          </div>

          <div className="flex justify-center">
            {/* <LikeButton data={props} /> */}
          </div>
          <div className="text-center mb-3">Posté le {date}</div>
        </form>
      )}
    </Fragment>
  );
}

export default CardPost;
