import React, { useState } from "react";
import "../css/snippet.css";

export default function Snippet(props) {
  const [copyText, setCopyText] = useState("Copy!");
  const [langauge, setLangauge] = useState("");
  const [currentTopic, setCurrentTopic] = useState("");

  if (currentTopic !== props.topic) {
    setLangauge("cpp");
    setCurrentTopic(props.topic);
  }

  let code = props.details.snippet.cpp;

  const handleLanguageChange = (newLanguage) => {
    setLangauge(newLanguage);
    setCopyText("Copy!");
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(code);
    setCopyText("Copied!");
  };

  return (
    <div className="snippet-container">
      <h2 className="snippet-title">{props.details.title}</h2>
      <p className="snippet-contributor">
        <a href={props.details.contributorId} target="_blank" rel="noreferrer">
          {props.details.contributor}
        </a>
      </p>
      <p className="snippet-description">{props.details.description}</p>
      <pre className="code-snippet">
        {langauge ? props.details.snippet[langauge] : code}
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
