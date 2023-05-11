import React from "react";
import "./Home.css";
import Search from "../../components/Search";
import SnippetList from "../../components/SnippetList";

function Home({ parentTopic }) {
  return (
    <>
      <div className="Home">
        <Search topic={parentTopic} />
        <SnippetList topic={parentTopic} />
      </div>
    </>
  );
}

export default Home;
