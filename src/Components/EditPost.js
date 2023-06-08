import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { format } from "date-fns";
import api from "../axios/createAxios";
import Spinner from "./Spinner";

export default function EditPost() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const { id } = useParams();
  const { postsList, setPostsList } = useContext(DataContext);
  const navigate = useNavigate();

  let post = postsList.find((i) => {
    return i.id === Number(id);
  });

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setDesc(post.desc);
    }
  }, [post]);

  const editPost = async (e) => {
    setShowSpinner(true);
    e.preventDefault();
    let editedPost = {
      id: Number(id),
      title,
      date: format(new Date(), "MMM dd, yy pp"),
      desc,
    };
    let editedList = postsList.map((i) => {
      return i.id === Number(id) ? editedPost : i;
    });
    setPostsList(editedList);
    try {
      await api.put(`/postsList/${id}`, editedPost);
    } catch (error) {
      console.log(error);
    } finally {
      setShowSpinner(false);
      navigate("/");
    }
  };
  return (
    <>
      {post ? (
        <section className="NewPost">
          <h2>Edit Post</h2>
          {showSpinner ? (
            <Spinner />
          ) : (
            <form className="newPostForm" onSubmit={editPost}>
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
              <button type="submit">Edit Post</button>
            </form>
          )}
        </section>
      ) : (
        <>
          <h2>Post Not Found</h2>
          <Link to="/">
            <p>Visit Our Homepage</p>
          </Link>
        </>
      )}
    </>
  );
}
