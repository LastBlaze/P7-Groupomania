import React, { useState, useEffect, useContext } from "react";
import instance from "../../config/Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";

function LikeButton(props) {
  const item = props.item;
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);

  const [changeColorLike, setChangeColorLike] = useState(false);
  const [changeColorDislike, setChangeColorDislike] = useState(false);
  const [btnDisable, setBtnDisable] = useState(false);

  const handleClickLike = () => {
    setChangeColorLike(!changeColorLike);
  };

  const handleClickDislike = () => {
    setChangeColorDislike(!changeColorDislike);
  };

  // useEffect (() => {
  //   instance.get
  // }

  function likePost(item) {
    instance(`http://localhost:3001/api/v1/msg/${item._id}/like`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setLikes(res.data.publication.usersLiked);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function dislikePost(item) {
    instance(`http://localhost:3001/api/v1/msg/${item._id}/like`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setDislikes(res.data.publication.usersDisliked);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="LikeButton flex text-center">
      <button data-type="like" className="flex">
        <FontAwesomeIcon
          onClick={() => {
            likePost(item);
            handleClickLike();
          }}
          className={`hover:text-green-500  pt-4 cursor-pointer ${
            changeColorLike === true ? "text-green-500" : "text-white"
          }`}
          icon={faThumbsUp}
        ></FontAwesomeIcon>
        <div className="p-3 mr-5">{likes.length}</div>
      </button>

      <button data-type="dislike" className="flex">
        <FontAwesomeIcon
          onClick={() => {
            dislikePost(item);
            handleClickDislike();
          }}
          className={`hover:text-red-500 pt-4 cursor-pointer ${
            changeColorDislike === true ? "text-red-500" : "text-white"
          }`}
          icon={faThumbsDown}
        ></FontAwesomeIcon>
        <div className="p-3">{dislikes.length}</div>
      </button>
    </div>
  );
}
export default LikeButton;
