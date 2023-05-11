import React from "react";
import "./Home.css";
import Search from "../../components/Search/Search";
import SnippetList from "../../components/SnippetList/SnippetList";

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
