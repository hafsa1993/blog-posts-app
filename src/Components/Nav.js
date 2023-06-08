import React, { useContext } from "react";
import { Link } from "react-router-dom";
import DataContext from "../context/DataContext";

export default function Nav() {

  const {searchText,setSearchText} = useContext(DataContext)

  return (
    <nav className="Nav">
      <form className="searchForm">
        <label htmlFor="search">Search</label>
        <input
          type="text"
          id="search"
          placeholder="Search"
          value={searchText}
          onChange={(e)=>setSearchText(e.target.value)}
        />
      </form>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/addpost">Add Post</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}
