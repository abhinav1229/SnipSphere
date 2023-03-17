import React from 'react';
import { useState } from 'react';

export default function Snippet(props) {

  const [copy, setCopy] = useState("Copy!");
  const [code, setCode] = useState('');

  return (
    <>
      <div className="snippet-container">
        <h2 className="snippet-title">{props.details.title}</h2>
        <p className="snippet-contributor"><a href="https://github.com/abhinav1229" target="_blank">{props.details.contributor}</a></p>
        <p className="snippet-decrp">
          {props.details.description}
        </p>
        <pre className="code-snippet">
          {
            code.length == 0 
            ? props.details.snippet.cpp 
            : code
          }
        </pre>

        <div className="btn-container">
          <button className="snippets-btn language-btn" onClick={() => {
            setCode(props.details.snippet.cpp);
            setCopy("Copy!");
          }}>C++</button>
          <button className="snippets-btn language-btn" onClick={() => {
            setCode(props.details.snippet.java);
            setCopy("Copy!");
          }}>Java</button>
          <button className="snippets-btn language-btn" onClick={() => {
            setCode(props.details.snippet.python);
            setCopy("Copy!");
          }}>Python</button>

          <button className="snippets-btn copy-btn" onClick={() => {
            navigator.clipboard.writeText(code);
            setCopy("Copied!");
            console.log(code)
          }
          }>{copy}</button>
        </div>

        <div className="line"></div>
        <p className="complexity snippet-time">Time Complexity: <b>{props.details.timeComplexity}</b></p>
        <p></p>
        <p className="complexity snippet-space">Space Complexity: <b>{props.details.spaceComplexity}</b></p>
        <p></p>
      </div>
    </>
  )
}