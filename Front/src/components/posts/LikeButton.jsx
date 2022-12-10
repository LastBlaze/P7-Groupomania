import React, { useState, useEffect } from "react";
import instance from "../../config/Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";

function LikeButton(props) {
  const item = props.item;

  const [likes, setLikes] = useState(item.usersLiked);
  const [dislikes, setDislikes] = useState(item.usersDisliked);

  const [disableLike, setDisableLike] = useState(false);
  const [disableDislike, setDisableDislike] = useState(false);

  const [changeColorLike, setChangeColorLike] = useState(false);
  const [changeColorDislike, setChangeColorDislike] = useState(false);

  const userData = JSON.parse(localStorage.userInfo);

  useEffect(() => {
    if (likes.includes(userData.userId)) {
      setChangeColorLike(!changeColorLike);
      setDisableDislike(!disableDislike);
    }
  }, []);

  useEffect(() => {
    if (dislikes.includes(userData.userId)) {
      setChangeColorDislike(!changeColorDislike);
      setDisableLike(!disableLike);
    }
  }, []);

  function likePost(item) {
    if (changeColorLike == true) {
      instance(`http://localhost:3001/api/v1/msg/${item._id}/like`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          type: "like",
          number: 0,
        },
      })
        .then((res) => {
          setLikes(res.data);
          setChangeColorLike(!changeColorLike);
          setDisableDislike(!disableDislike);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      instance(`http://localhost:3001/api/v1/msg/${item._id}/like`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          type: "like",
          number: 1,
        },
      })
        .then((res) => {
          setLikes(res.data);
          setChangeColorLike(!changeColorLike);
          setDisableDislike(!disableDislike);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  function dislikePost(item) {
    if (changeColorDislike == true) {
      instance(`http://localhost:3001/api/v1/msg/${item._id}/like`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          type: "dislike",
          number: 0,
        },
      })
        .then((res) => {
          setDislikes(res.data);
          setChangeColorDislike(!changeColorDislike);
          setDisableLike(!disableLike);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      instance(`http://localhost:3001/api/v1/msg/${item._id}/like`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          type: "dislike",
          number: -1,
        },
      })
        .then((res) => {
          setDislikes(res.data);
          setChangeColorDislike(!changeColorDislike);
          setDisableLike(!disableLike);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  return (
    <div className="LikeButton flex text-center">
      <button data-type="like" className="flex cursor-default">
        <FontAwesomeIcon
          onClick={() => {
            if (!disableLike) {
              likePost(item);
            }
          }}
          className={`pt-4 cursor-pointer ${
            disableLike
              ? "text-gray-500 cursor-default"
              : [
                  changeColorLike === true
                    ? "text-green-500"
                    : "text-white hover:text-green-500",
                ]
          }`}
          icon={faThumbsUp}
        ></FontAwesomeIcon>
        <div className="p-3 mr-5 cursor-default">{likes.length}</div>
      </button>

      <button data-type="dislike" className="flex cursor-default">
        <FontAwesomeIcon
          onClick={() => {
            if (!disableDislike) {
              dislikePost(item);
            }
          }}
          className={`pt-4 cursor-pointer ${
            disableDislike
              ? "text-gray-500 cursor-default"
              : [
                  changeColorDislike === true
                    ? "text-red-500"
                    : "text-white hover:text-red-500",
                ]
          }`}
          icon={faThumbsDown}
        ></FontAwesomeIcon>
        <div className="p-3 cursor-default">{dislikes.length}</div>
      </button>
    </div>
  );
}
export default LikeButton;
