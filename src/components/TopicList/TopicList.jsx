import React, { useState } from "react";

function TopicList({
  setParentTopic,
  setShowSnippets,
  width,
  navOpen,
  setNavOpen,
}) {
  let allTopics = [
    {
      tag: "array",
      name: "Array",
    },
    {
      tag: "string",
      name: "String",
    },
    {
      tag: "linkedlist",
      name: "Linked List",
    },
    {
      tag: "tree",
      name: "Tree",
    },
    {
      tag: "stack",
      name: "Stack",
    },
    {
      tag: "queue",
      name: "Queue",
    },
    {
      tag: "number",
      name: "Number",
    },
    {
      tag: "graph",
      name: "Graph",
    },
    {
      tag: "bitmanip",
      name: "Bit Manipulation",
    },
  ];
  return (
    <>
      {allTopics.map((topic, index) => {
        return (
          <div
            className="snippetBox"
            onClick={() => {
              setParentTopic(topic.tag);
              setShowSnippets(false);
              setNavOpen(width >= 815 && navOpen ? true : false);
            }}
            key={index}
          >
            {topic.name}
          </div>
        );
      })}
    </>
  );
}

export default TopicList;
