import React, { useEffect, useState } from "react";
import "./snippet.css";
import axios from "axios";
import { BASE_URL } from "../../helper/ref";
import { NavLink } from "react-router-dom";

export default function Snippet(props) {
  const [copyText, setCopyText] = useState("Copy!");
  const [language, setLanguage] = useState("");
  const [currentTopic, setCurrentTopic] = useState("");
  const [contributor, setContributor] = useState("");

  if (currentTopic !== props.topic) {
    setLanguage("cpp");
    setCurrentTopic(props.topic);
  }

  console.log(props.details.codeobj);
  let code = props.details.codeobj.cpp;

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

  return (
    <div className="snippet-container">
      <h2 className="snippet-title">{props.details.title}</h2>
      <p className="snippet-contributor">
        <NavLink to={`/profile/${props.details.userId}`} rel="noreferrer">
          {contributor}
        </NavLink>
      </p>
      <p className="snippet-description">{props.details.description}</p>
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

      <hr className="snippet-line" />
      <p className="complexity snippet-time">
        Time Complexity: <b>{props.details.timeComplexity}</b>
      </p>
      <p className="complexity snippet-space">
        Space Complexity: <b>{props.details.spaceComplexity}</b>
      </p>
    </div>
  );
}
