import React, { useEffect, useState } from "react";
import Snippet from "../Snippet/Snippet.jsx";
import "./SnippetList.css";
import { BASE_URL } from "../../helper/ref.js";
import axios from "axios";
import ReactLoading from "react-loading";

export default function SnippetList(props) {
  const { topic } = props;
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      let response = await axios.get(`${BASE_URL}/snippets/all`, {
        params: {
          topic,
        },
      });
      setSnippets(response.data);
      setLoading(false);
    }

    fetchData();
  }, [topic]);
  return (
    <div
      className={`code-container`}
      style={
        loading
          ? {
              height: "70vh",
              alignItems: "center",
              justifyContent: "center",
            }
          : snippets.length == 0
          ? {
              height: "70vh",
              alignItems: "center",
              justifyContent: "center",
            }
          : {}
      }
    >
      {loading ? (
        <ReactLoading type={"spin"} color={"grey"} height={50} width={50} />
      ) : snippets.length ? (
        snippets.map((snippet, index) => {
          return <Snippet topic={topic} details={snippet} key={index} />;
        })
      ) : (
        <div className="noSnippetMessage">
          Sorry! We didn't found any snippets of
          <span style={{ color: "yellow" }}> {topic}</span>.
        </div>
      )}
    </div>
  );
}
