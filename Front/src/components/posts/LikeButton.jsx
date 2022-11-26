import React, { useState, useEffect, useContext } from "react";
import instance from "../../config/Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import {UserIdContext} from "../AppContext";



function LikeButton(props) {
  const item = props.item;
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const userId = useContext(UserIdContext);

  const like = () => {}

  // const dislike = () => {}

  return (
    
  
    <div className="LikeButton flex text-center">
      
        <button data-type="like" className="flex" onClick={Like} alt="like"  disabled={
          !dislike
            ? true
            : false
        } > <FontAwesomeIcon color="white" className="hover:text-green-500 color pt-4 cursor-pointer" icon={faThumbsUp}> </FontAwesomeIcon>
        <div className="p-3 mr-5">
          0
        </div>
        </button>
      
      <button data-type="like" className="flex" disabled> <FontAwesomeIcon color="white" className="hover:text-green-500 color pt-4 cursor-pointer" icon={faThumbsUp}> </FontAwesomeIcon>
      <div className="p-3 mr-5">
        0
      </div>
      </button>

      <button data-type="dislike"
     className="flex"
        > <FontAwesomeIcon color="white" className="hover:text-red-500 pt-4 cursor-pointer" icon={faThumbsDown}></FontAwesomeIcon>
      <div className="p-3">
        0
      </div>
      
      </button>
    </div>

  );
}
export default LikeButton;