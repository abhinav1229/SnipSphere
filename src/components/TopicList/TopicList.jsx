import React, { useState } from "react";

function TopicList({ setParentTopic }) {
  //   const renderWelcomeText = () => {
  //     return (
  //       <div className="welcome-text">
  //         Copy the snippets and paste on your main code...
  //       </div>
  //     );
  //   };

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
    </>
  );
}

export default TopicList;
