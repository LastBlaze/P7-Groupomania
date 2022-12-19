import React from "react";
import instance from "../../config/Axios";
import { useState } from "react";

const NewPost = (props) => {
  const [description, setDescription] = useState("");

  // function refreshPage() {
  //   window.location.reload(false);
  // }

function refreshPage() {
  setTimeout(function(){ window.location.reload()}, 1000);
}


  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    instance
      .post("http://localhost:3001/api/v1/msg/", formData, {
        mode: "no-cors",
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      <div className="flex flex-col justify-between rounded-3xl bg-white border-8  border-tertiary p-2 mt-20 container max-w-xl min-h-[250px] lg:mt-10">
        <label htmlFor="description"></label>
        <input
          type="text"
          className="
              flex-1
              form-control
              block
              w-auto
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
              mb-2
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          name="description"
          rows="3"
          placeholder="Exprimez-vous !"
          id="description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></input>
        <label htmlFor="image"></label>
        <input
          type="file"
          className="border border-gray-300 file:border-none file:bg-gray-300 file:cursor-pointer file:hover:font-bold bg-white text-gray-500 mb-2"
          name="image"
          id="image"
          accept="image/"
        />
        <label htmlFor="btnValider"></label>
        <input
          name="btnValider"
          type="submit"
          className="btn rounded-none rounded-b-3xl bg-base-100"
          onSubmit={handleSubmit}
          onClick={refreshPage}
          value="valider"
          disabled={!description ? true : false}
        />
      </div>
    </form>
  );
};

export default NewPost;
