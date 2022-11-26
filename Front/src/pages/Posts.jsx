import React, { useState, useEffect } from "react";
import instance from "../config/Axios";
import Thread from "../components/posts/Thread";
import NewPost from "../components/posts/NewPost";
import LikeButton from "../components/posts/LikeButton";
// import Logout from "../components/home/Logout";




function DisplayPosts() {
    const [postData, setPostData] = useState([]);

  useEffect(() => {
    instance("/api/v1/msg")
      .then((res) => {
        // console.log('Posts :',res.data);
        setPostData(res.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);


    return (
        <div className="h-full w-full flex flex-col">
          {/* <Logout/> */}
        <NewPost data={postData} setData={setPostData}/>
        {/* <Thread data={postData}  /> */}
        <Thread data={postData}><LikeButton data={postData}/></Thread>
          {/* <Logout /> */}
        </div>
    );
}

export default DisplayPosts;
