import React from "react";
import { Link } from "react-router-dom";

export default function Missing() {
  return (
    <article>
      <h2>Post Not Found</h2>
      <Link to="/">
        <p>Visit Our Homepage</p>
      </Link>
    </article>
  );
}
