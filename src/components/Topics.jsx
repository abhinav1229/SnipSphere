import React, { useState } from "react";
import "../css/topics.css";
import Search from "./Search";
import Code from "./SnippetList";

export default function Topics() {
  const [selectedTopic, setSelectedTopic] = useState("");

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
  };

  const renderTopicButton = (topic) => {
    const isActive = selectedTopic === topic;
    const className = `snippetBox topic-tag ${isActive ? "snippetBox active-topic" : ""}`;

    return (
      <button
        className={className}
        id={`topic-${topic}`}
        onClick={() => handleTopicClick(topic)}
      >
        {topic}
      </button>
    );
  };

  const renderWelcomeText = () => {
    return <div className="welcome-text">Copy the snippets and paste on your main code...</div>;
  };

  return (
    <>
      <div className="topic-container">
        {renderTopicButton("array")}
        {renderTopicButton("linkedlist")}
        {renderTopicButton("tree")}
        {renderTopicButton("stack")}
        {renderTopicButton("queue")}
        {renderTopicButton("graph")}
      </div>

      <Search topic={selectedTopic} />

      {selectedTopic ? <Code topic={selectedTopic} /> : renderWelcomeText()}
    </>
  );
}
