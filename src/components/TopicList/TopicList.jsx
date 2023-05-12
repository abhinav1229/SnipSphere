import React, { useState } from "react";

function TopicList({ setParentTopic }) {
  return (
    <>
      <div className="snippetBox" onClick={() => setParentTopic("array")}>
        Array
      </div>
      <div className="snippetBox" onClick={() => setParentTopic("linkedlist")}>
        LinkedList
      </div>
      <div className="snippetBox" onClick={() => setParentTopic("tree")}>
        Tree
      </div>
      <div className="snippetBox" onClick={() => setParentTopic("queue")}>
        Queue
      </div>
      <div className="snippetBox" onClick={() => setParentTopic("stack")}>
        Stack
      </div>
      <div className="snippetBox" onClick={() => setParentTopic("graph")}>
        Graph
      </div>
      <div className="snippetBox" onClick={() => setParentTopic("number")}>
        Number
      </div>
      <div className="snippetBox" onClick={() => setParentTopic("bitmanip")}>
        Bit Manipulation
      </div>
    </>
  );
}

export default TopicList;
