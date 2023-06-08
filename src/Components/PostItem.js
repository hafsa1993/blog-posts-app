import React from "react";
import { Link } from "react-router-dom";

export default function PostItem({ id, title, date, desc }) {
  return (
    <article className="post ViewPost">
      <h2>{title}</h2>
      <p className="postDate">Published: {date}</p>
      <p className="postBody">
        {desc.length < 15 ? desc : `${desc.slice(0, 15)}...`}
      </p>
      <Link to={`/post/${id}`}>
        <button className="editButton">View Post</button>
      </Link>
    </article>
  );
}
