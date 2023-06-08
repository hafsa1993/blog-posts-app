import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import api from "../axios/createAxios";
import Spinner from "./Spinner";

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { postsList, setPostsList } = useContext(DataContext);
  const [showSpinner, setShowSpinner] = useState(false);

  let post = postsList.find((i) => {
    return i.id === Number(id);
  });

  const deletePost = async () => {
    setShowSpinner(true);
    let newlist = postsList.filter((i) => {
      return i.id !== Number(id);
    });
    setPostsList(newlist);
    try {
      await api.delete(`/postsList/${id}`);
    } catch (error) {
      console.log(`Error:${error}`);
    } finally {
      setShowSpinner(false);
      navigate("/");
    }
  };

  return (
    <>
      {showSpinner ? (
        <Spinner />
      ) : post ? (
        <article className="PostDetails">
          <h2>{post.title}</h2>
          <p className="postDate">Published: {post.date}</p>
          <p className="postBody">{post.desc}</p>
          <Link to={`/editpost/${id}`}>
            <button className="editButton">Edit</button>
          </Link>
          <button className="deleteButton" onClick={deletePost}>
            Delete
          </button>
        </article>
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
