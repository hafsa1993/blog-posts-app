import React, { useState } from "react";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { format } from "date-fns";
import api from "../axios/createAxios";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

export default function AddPost() {
  const { postsList, setPostsList } = useContext(DataContext);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const navigate = useNavigate();

  const addPost = async (e) => {
    setShowSpinner(true);
    let id =
      postsList.length === 0 ? 1 : postsList[postsList.length - 1].id + 1;
    e.preventDefault();
    let newPost = {
      id,
      title,
      date: format(new Date(), "MMM dd, yy pp"),
      desc,
    };
    setPostsList(postsList.concat(newPost));
    try {
      await api.post("/postsList", newPost);
    } catch (error) {
      console.log(`Error:${error}`);
    } finally {
      setShowSpinner(false);
      setTitle("");
      setDesc("");
      navigate("/");
    }
  };

  return (
    <section className="NewPost">
      <h2>Add Post</h2>
      {showSpinner ? (
        <Spinner />
      ) : (
        <form className="newPostForm" onSubmit={addPost}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            required
            autoFocus
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="desc">Description</label>
          <textarea
            type="text"
            id="desc"
            required
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button type="submit">Add Post</button>
        </form>
      )}
    </section>
  );
}
