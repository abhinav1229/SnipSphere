import React, { useState, useEffect } from "react";
import "./search.css";
import Snippet from "../Snippet/Snippet.jsx";
import data from "../../helper/data.json";
import { BASE_URL } from "../../helper/ref";
import axios from "axios";

export default function Search(props) {
  // State variables
  const [searchText, setSearchText] = useState("");
  const [isSnippetFound, setIsSnippetFound] = useState(false);
  const [matchingSnippet, setMatchingSnippet] = useState({});

  // Event handler for search input change
  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value.trim().toLowerCase());
  };

  // Listen for changes to searchText and update isSnippetFound and matchingSnippet

  useEffect(() => {
    if (searchText === "") {
      setIsSnippetFound(false);
      setMatchingSnippet(null);
    } else {
      async function fetchAllSnippets() {
        let response = await axios.get(`${BASE_URL}/snippets/allsnippets`);
        console.log(response.data);
        let allTopics = [
          "array",
          "linkedlist",
          "tree",
          "stack",
          "queue",
          "graph",
          "number",
          "bitmanip",
        ];
        let currentTopic = props.topic.length > 0 ? props.topic : allTopics[0];

        // If topic is selected, give it higher priority for search
        if (currentTopic !== allTopics[0]) {
          let temp = allTopics[0];
          allTopics[allTopics.indexOf(currentTopic)] = temp;
          allTopics[0] = currentTopic;
        }

        // Search for matching snippets in all topics
        for (let i = 0; i < allTopics.length; i++) {
          let topic = allTopics[i];

          let snippets = response.data.filter((snippet) => {
            return snippet.topic == topic;
          });

          for (let j = 0; j < snippets.length; j++) {
            let snippet = snippets[j];

            // If the  snippet title contains the search text, set isSnippetFound and matchingSnippet
            if (snippet.title.toLowerCase().indexOf(searchText) !== -1) {
              setIsSnippetFound(true);
              setMatchingSnippet(snippet);
              return;
            }
          }
        }

        // If no matching snippet was found, set isSnippetFound to false
        setIsSnippetFound(false);
      }

      fetchAllSnippets();
    }
  }, [searchText, props.topic]);

  return (
    <div
      className={
        isSnippetFound && searchText
          ? "search-container searchBg"
          : "search-container"
      }
    >
      <input
        type="search"
        id="search"
        placeholder="Search a snippet"
        onChange={handleSearchInputChange}
      />

      {searchText && isSnippetFound && matchingSnippet ? (
        <Snippet details={matchingSnippet} />
      ) : null}
    </div>
  );
}
