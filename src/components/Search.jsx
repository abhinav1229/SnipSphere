import React, { useState, useEffect } from "react";
import "../css/search.css";
import Snippet from "./Snippet.jsx";
import data from "../helper/data.json";

export default function Search(props) {
  // State variables
  const [searchText, setSearchText] = useState("");
  const [isSnippetFound, setIsSnippetFound] = useState(false);
  const [matchingSnippet, setMatchingSnippet] = useState(null);

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
      let allTopics = ["array", "linkedlist", "tree", "stack", "queue", "graph"];
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
        let snippets = data[topic];

        for (let j = 0; j < snippets.length; j++) {
          let snippet = snippets[j];

          // If the snippet title contains the search text, set isSnippetFound and matchingSnippet
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
  }, [searchText, props.topic]);

  return (
    <div className={isSnippetFound ? "search-container searchBg" : "search-container"}>
      <input type="search" id="search" placeholder="Search a snippet" onChange={handleSearchInputChange} />

      {isSnippetFound && matchingSnippet ? <Snippet details={matchingSnippet} /> : null}
    </div>
  );
}
