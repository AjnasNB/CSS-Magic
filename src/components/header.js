// Header.js
import logo from "../assets/logo.png";

import React from "react";
import "./header.css";

const Header = () => {
  return (
    <header className="app-header">
      <div className="app-logo">
        <img
          src={logo}
          alt="SqlMagic Logo"
        />
        <h1>CSSMagic</h1>
      </div>
      <div className="creator-link">
        <a href="https://ajnasnb.live" target="_blank" rel="noopener noreferrer" placeholder="click to see the creator">
          Creator
        </a>
      </div>
    </header>
  );
};

export default Header;
