import React, { useEffect, useState } from "react";
import "./snippet.css";
import axios from "axios";
import { BASE_URL } from "../../helper/ref";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Snippet(props) {
  const [copyText, setCopyText] = useState("Copy!");
  const [language, setLanguage] = useState("");
  const [currentTopic, setCurrentTopic] = useState("");
  const [contributor, setContributor] = useState("");
  const [deleted, setDeleted] = useState(false);

  const navigate = useNavigate();

  if (currentTopic !== props.topic) {
    setLanguage("cpp");
    setCurrentTopic(props.topic);
  }

  let code = props.details.codeobj.cpp;
  let localData = JSON.parse(localStorage.getItem("userInfoSnipSphere"));

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCopyText("Copy!");
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(code);
    setCopyText("Copied!");
  };

  // getting the userprofile
  useEffect(() => {
    async function fecthContributor() {
      let userDetail = await axios.get(`${BASE_URL}/user/userInfoById`, {
        params: {
          userId: props.details.userId,
        },
      });
      setContributor(userDetail.data[0].fullName);
    }
    fecthContributor();
  }, []);

  async function deleteSnippet(id) {
    if (window.confirm("Are you sure want to delete snippet?") === true) {
      let response = await axios.delete(`${BASE_URL}/snippets/delete`, {
        params: {
          id,
        },
      });
      setDeleted(true);
    } else {
      // do nothing
    }
  }

  function editSnippet(id) {
    navigate(`/update/${id}`);
  }

  return (
    <div className="snippet-container">
      {deleted && (
        <p style={{ color: "yellowgreen", fontSize: "1.2rem" }}>
          Successfully Deleted! Please refresh the page to see the changes.
        </p>
      )}
      <h2 className="snippet-title">{props.details.title}</h2>
      <p className="snippet-contributor">
        <NavLink to={`/profile/${props.details.userId}`} rel="noreferrer">
          {contributor}
        </NavLink>
      </p>
      <pre className="snippet-description">{props.details.description}</pre>
      <pre className="code-snippet">
        {language ? props.details.codeobj[language] : code}
      </pre>
      <div className="btn-container">
        <button
          className="snippets-btn language-btn"
          onClick={() => handleLanguageChange("cpp")}
        >
          C++
        </button>
        <button
          className="snippets-btn language-btn"
          onClick={() => handleLanguageChange("java")}
        >
          Java
        </button>
        <button
          className="snippets-btn language-btn"
          onClick={() => handleLanguageChange("python")}
        >
          Python
        </button>
        <button className="snippets-btn copy-btn" onClick={handleCopyClick}>
          {copyText}
        </button>
      </div>

      <div className="snippet-line"></div>
      <p className="complexity snippet-time">
        Time Complexity: <b>{props.details.timeComplexity}</b>
      </p>
      <p className="complexity snippet-space">
        Space Complexity: <b>{props.details.spaceComplexity}</b>
      </p>
      {localData && localData._id === props.details.userId && !deleted && (
        <div className="editButtonContainer">
          <button
            className="edit"
            onClick={() => editSnippet(props.details._id)}
          >
            Edit
          </button>
          <button
            className="delete"
            onClick={() => deleteSnippet(props.details._id)}
          >
            Delete
          </button>
          <button className="visibilityButton" disabled>
            {props.details.visibility ? "Public" : "Private"}
          </button>
        </div>
      )}
    </div>
  );
}
