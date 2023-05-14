import React, { useState } from "react";
import "./AddSnippet.css";
import { BASE_URL } from "../../helper/ref";
import { useNavigate } from "react-router";
import axios from "axios";

function AddSnippet() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [timeComplexity, setTimeComplexity] = useState("");
  const [spaceComplexity, setSpaceComplexity] = useState("");
  const [topic, setTopic] = useState("array");
  const [codecpp, setCodecpp] = useState("");
  const [codepython, setCodepython] = useState("");
  const [codejava, setCodejava] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let localData = JSON.parse(localStorage.getItem("userInfoSnipSphere"));
    let codeobj = {
      cpp: codecpp,
      java: codejava,
      python: codepython,
    };
    // if (localData) {
    let result = await axios.post(`${BASE_URL}/snippets/save`, {
      title,
      description,
      timeComplexity,
      topic,
      spaceComplexity,
      userId: localData._id,
      codeobj,
      visibility: isPublic,
    });
    if (result.status === 200) {
      navigate("/");
    }
    // } else {
    //   console.log("Please Login to Save your snippet");
    // }
  };
  return (
    <div className="AddSnippet FormContainer">
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="">Topic</label>
          <select
            name=""
            id=""
            value={
              [
                { value: "array" },
                { value: "string" },
                { value: "linkedlist" },
                { value: "tree" },
                { value: "queue" },
                { value: "stack" },
                { value: "graph" },
                { value: "number" },
                { value: "bitmanip" },
              ].find((obj) => obj.value === topic).value
            }
            onChange={(e) => {
              setTopic(e.target.value);
            }}
          >
            <option value="array">Array</option>
            <option value="string">String</option>
            <option value="linkedlist">Linked List</option>
            <option value="tree">Tree</option>
            <option value="queue">Queue</option>
            <option value="stack">Stack</option>
            <option value="graph">Graph</option>
            <option value="number">Number</option>
            <option value="bitmanip">Bit Manipulation</option>
          </select>
        </div>
        <div className="formGroup">
          <label htmlFor="">Title</label>
          <input
            type="text"
            name=""
            id=""
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="">Description</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="5"
            required
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="formGroup">
          <label htmlFor="">Code</label>
          <div className="langugeBoxContainer">
            <div
              className={
                language === "cpp"
                  ? `languageBox selectedLanguage`
                  : `languageBox`
              }
              onClick={() => setLanguage("cpp")}
            >
              C++
            </div>
            <div
              className={
                language === "java"
                  ? `languageBox selectedLanguage`
                  : `languageBox`
              }
              onClick={() => setLanguage("java")}
            >
              Java
            </div>
            <div
              className={
                language === "python"
                  ? `languageBox selectedLanguage`
                  : `languageBox`
              }
              onClick={() => setLanguage("python")}
            >
              Python
            </div>
          </div>
          <textarea
            name=""
            id=""
            cols="30"
            rows="5"
            value={
              language === "cpp"
                ? codecpp
                : language === "java"
                ? codejava
                : codepython
            }
            required
            onChange={(e) => {
              language === "cpp" && setCodecpp(e.target.value);
              language === "java" && setCodejava(e.target.value);
              language === "python" && setCodepython(e.target.value);
            }}
            placeholder={`Write ${
              language === "cpp" ? "C++" : language
            } Code...`}
          ></textarea>
        </div>

        <div className="formGroup">
          <label htmlFor="">Time Complexity</label>
          <input
            type="text"
            name=""
            id=""
            placeholder="O(n)"
            required
            onChange={(e) => setTimeComplexity(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="">Space Complexity</label>
          <input
            type="text"
            name=""
            id=""
            placeholder="O(n)"
            required
            onChange={(e) => setSpaceComplexity(e.target.value)}
          />
        </div>
        <div className="formGroup buttonContainer">
          <div
            onClick={() => setIsPublic(true)}
            className="publicButton"
            style={!isPublic ? { backgroundColor: "rgb(70, 70, 70)" } : null}
          >
            Public
          </div>
          <div
            onClick={() => setIsPublic(false)}
            className="privateButton"
            style={isPublic ? { backgroundColor: "rgb(70, 70, 70)" } : null}
          >
            Private
          </div>
        </div>
        <div className="formGroup">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

export default AddSnippet;
