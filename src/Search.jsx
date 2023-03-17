import React from "react";
import { useState } from "react"

import Snippet from './Snippet.jsx'
import data from './data.json';

export default function Search(props) {

  // Hooks
  const [name, setName] = useState('');
  const [found, setFound] = useState(false);
  const [snp, setSnp] = useState({});

  // event Handler
  const handleChange = (event) => {
  console.log(event.target.value);
    setName(() => (event.target.value).trim().toLowerCase());
    console.log(name);
    let allTopics = ['array', 'linkedlist', 'tree', 'stack', 'queue', 'graph'];

    let currentTopic = '';
    if(props.topic.length == 0) {
      currentTopic = 'array';
    } else {
      currentTopic = props.topic;
    }

    
    // If topic is selected, then give it higher priorityfor search
    if (currentTopic.length > 0) {
      let temp = allTopics[0];
      allTopics[allTopics.indexOf(currentTopic)] = temp;
      allTopics[0] = currentTopic;
    }

    let isGet = false;

    // searching in all topics
    for (let i = 0; i < allTopics.length; i++) {
      let oneTopic = data[allTopics[i]];

      // getting one topic from all the topic
      for (let j = 0; j < oneTopic.length; j++) {

        // getting sinlge code snippet object from chosen topic
        let snippet = oneTopic[j];
        let titleOfSnippet = (snippet.title).toLowerCase();

        // If title is found
        if ((name.length > 0) && (titleOfSnippet.indexOf(name) != -1)) {
          setSnp(snippet);
          setFound(true);
          isGet = true;
          // console.log("mil gya...", titleOfSnippet);
          break;
        } else {
          // console.log("nhi mila yrrrrr...", titleOfSnippet);
          if(!isGet)
            isGet = false;
        }
      }
      if (isGet && currentTopic.length > 0 && allTopics[i] == currentTopic) {
        // console.log("yha se bahr...", titleOfSnippet);
        break;
      }

    }

    if (currentTopic.length > 0 && !isGet) {
      // console.log("niii..")
      setFound(false);
    }
  };


  return (
    <>
      <div className={(name.length > 0 && found) ? "search-container searchBg" : "search-container"}>
        <input
          type="search"
          id="search"
          placeholder="Search a snippet"
          onChange={() => handleChange(event)}
        />

        {
          (name.length > 0 && found)
            ? <Snippet details={snp}></Snippet>
            : ''
        }

      </div>
    </>
  )
}
