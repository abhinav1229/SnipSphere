import React from 'react';
import "../css/header.css";

export default function Header() {
  return (
    <header className="header-bg">
      <nav className="navbar">
        <div className="logo">
          <h1>Code Snippet</h1>
        </div>
        <div className="navbar-items">
          <ul>
            <li>
              <a href="/" className="nav-link">Home</a>
            </li>
            <li>
              <a href="/snippets" className="nav-link">Snippets</a>
            </li>
            <li>
              <a href="/about" className="nav-link">About</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
