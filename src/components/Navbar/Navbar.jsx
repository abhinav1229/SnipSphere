import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import TopicList from "../TopicList/TopicList";
import useWindowDimensions from "./useWindowDimensions";

function Navbar({ setParentTopic, showNav, setShowNav }) {
  const [navOpen, setNavOpen] = useState(false);
  const [showSnippets, setShowSnippets] = useState(false);
  const { height, width } = useWindowDimensions();
  const openAllSnippets = () => {
    setShowSnippets(!showSnippets);
  };

  let localData = JSON.parse(localStorage.getItem("userInfoSnipSphere"));

  useEffect(() => {
    if (width >= 641) {
      setNavOpen(true);
    }
  }, [width]);

  return (
    <>
      <nav style={navOpen ? { left: "0" } : { left: "-250px" }}>
        <div className="logoContainer">
          <NavLink
            to={"/"}
            className={"logoContainer"}
            onClick={() => setNavOpen(width >= 815 && navOpen ? true : false)}
          >
            SnipSphere
          </NavLink>
        </div>
        <div className="navLinkContainer">
          {localData && (
            <NavLink
              className="navLink userLink"
              to={`/profile/${localData._id}`}
              onClick={() => setNavOpen(width >= 815 && navOpen ? true : false)}
            >
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/color/48/user.png"
                alt="user"
              />{" "}
              <span>Hi, {localData.fullName}</span>
            </NavLink>
          )}
          <NavLink
            className="navLink"
            to={"/new"}
            onClick={() => setNavOpen(width >= 815 && navOpen ? true : false)}
          >
            Add New
          </NavLink>
          <div>
            <NavLink
              className="navLink"
              to={"/"}
              onClick={() => {
                openAllSnippets();
              }}
            >
              Snippets
            </NavLink>
            {showSnippets && (
              <div className="snippetContainer">
                <TopicList
                  setParentTopic={setParentTopic}
                  setShowSnippets={setShowSnippets}
                  setNavOpen={setNavOpen}
                  navOpen={navOpen}
                  width={width}
                />
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
                setNavOpen(width >= 815 && navOpen ? true : false);
              }}
            >
              Logout
            </NavLink>
          ) : (
            <NavLink
              className="navLink"
              to={"/login"}
              onClick={() => setNavOpen(width >= 815 && navOpen ? true : false)}
            >
              Login
            </NavLink>
          )}
        </div>
        {width <= 815 && (
          <div className="hamberger" onClick={() => setNavOpen(!navOpen)}>
            {!navOpen ? (
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAPElEQVR4nO3WsQkAMAwDQe2/dALuXIVUBnMHGkDdJwBAOUuWNUcAAOBpulplfGQ8AAC/pvNbxkfGA0CaC2n/KuSsP4fKAAAAAElFTkSuQmCC"
                height={30}
                width={30}
              />
            ) : (
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABGUlEQVR4nO3ZUQqDMAwG4J5ikx0p5Bd6jnncgdtpNgQHPmxibZqkpf+TL0o+1DahIfT09PQ0E2a+E9FgXQcRDUstp24GMAF4A5gtMUQ0LDWstUzJD4gxXpj5sT7gNY7jLSgHwPVbAzM/T9dgiYEUwhIDaYQFBqUQmhiURmhg1BAlMeqIEhgzhCTGHCGBcYPIwbhDnMG4RaRg3COOYKpB7GGqQ/yZIebttYdBLefN1PUmttl+TpbDWVaa+LTw48f2MDYnZW91qgaDA0usewwS9gm3GJzY7NxhkLFju8FAoO0wx0CwdzLDoEADqI5BwS5WDQOFVjyWxmjOE7EUxmIoitIYy8kuSmE8jKdRAtPM0Vszh6E9PT09wWM+8OYILNoEyFYAAAAASUVORK5CYII=" />
            )}
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
