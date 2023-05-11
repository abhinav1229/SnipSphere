import React from "react";
import Snippet from "../Snippet/Snippet.jsx";
import data from "../../helper/data.json";
import "./SnippetList.css";

export default function SnippetList(props) {
  const { topic } = props;

  // api calling for snippets
  const snippets = data[topic];
  console.log(snippets);
  return (
    <div className="code-container">
      {snippets &&
        snippets.map((snippet, index) => (
          <div className="snippet-container" key={index}>
            <Snippet topic={topic} details={snippet} />
          </div>
        ))}
    </div>
  );
}
