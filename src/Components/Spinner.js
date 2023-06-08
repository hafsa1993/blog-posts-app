import React from "react";
import spinnerImage from '../spinnerImage.gif'

export default function Spinner() {
  return (
    <div className="spinner">
      <img
        src={spinnerImage}
        alt="spinner"
        style={{ height: "100px", width: "100px" }}
      />
    </div>
  );
}
