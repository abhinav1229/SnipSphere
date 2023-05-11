import React, { useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import TopicList from "../TopicList/TopicList";

function Navbar({ setParentTopic }) {
  const [showSnippets, setShowSnippets] = useState(false);
  const openAllSnippets = () => {
    setShowSnippets(!showSnippets);
  };

  let localData = JSON.parse(localStorage.getItem("userInfoSnipSphere"));

  // console.log(localData);

  return (
    <>
      <nav>
        <div className="logoContainer">
          <NavLink to={"/"} className={"logoContainer"}>
            SnipSphere
          </NavLink>
        </div>
        <div className="navLinkContainer">
          {localData && (
            <NavLink
              className="navLink userLink"
              to={`/profile/${localData._id}`}
            >
              Hi, {localData.fullName}
            </NavLink>
          )}
          <NavLink className="navLink" to={"/new"}>
            Add New
          </NavLink>
          <div>
            <NavLink className="navLink" to={"/"} onClick={openAllSnippets}>
              Snippets
            </NavLink>
            {showSnippets && (
              <div className="snippetContainer">
                <TopicList setParentTopic={setParentTopic} />
              </div>
            )}
          </div>
          {localData ? (
            <NavLink
              className="navLink"
              to={"/login"}
              onClick={() => {
                localStorage.setItem("userInfoSnipSphere", null);
                setReloadNavbar(true);
              }}
            >
              Logout
            </NavLink>
          ) : (
            <NavLink className="navLink" to={"/login"}>
              Login
            </NavLink>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
