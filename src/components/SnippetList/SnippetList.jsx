import React, { useEffect, useState } from "react";
import Snippet from "../Snippet/Snippet.jsx";
import data from "../../helper/data.json";
import "./SnippetList.css";
import { BASE_URL } from "../../helper/ref.js";
import axios from "axios";

export default function SnippetList(props) {
  const { topic } = props;
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get(`${BASE_URL}/snippets/all`, {
        params: {
          topic,
        },
      });
      console.log(response.data);
      setSnippets(response.data);
    }

    fetchData();
  }, [topic]);
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
