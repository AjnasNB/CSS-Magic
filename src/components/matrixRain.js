// MatrixRain.js
import logo from "../assets/logo.png";
import React, { useEffect, useRef, useState } from "react";
import "./MatrixRain.css";

const MatrixRain = () => {
  const canvasRef = useRef(null);
  const [showContent, setShowContent] = useState(false);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Setting the width and height of the canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Setting up the letters
    var letters = "WWW.AJNASNB.ME";
    letters = letters.split("");

    // Setting up the columns
    var fontSize = 12,
      columns = canvas.width / fontSize;

    // Setting up the drops
    var drops = [];
    for (var i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    // Setting up the draw function
    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, .1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < drops.length; i++) {
        var text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillStyle = "#0f0";
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        drops[i]++;
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
      }
    }

    // Loop the animation
    const animationInterval = setInterval(draw, 33);

    return () => {
      clearInterval(animationInterval);
    };
  }, []);

  useEffect(() => {
    // Delayed action after 3000 milliseconds (3 seconds)
    const delay = setTimeout(() => {
      setShowContent(true);
    }, 2200);

    // Clean up the timeout when the component unmounts or when dependencies change
    return () => {
      clearTimeout(delay);
    };
  }, []); 

  return (
    <div className="matrix-container">
      <canvas ref={canvasRef} className="matrix-canvas" />
      {showContent ? 
      <span> <div className="typing-effect-center">
      <img
        src={logo}
        alt="SQL Magic Logo"
        className="magic-logo"
      />
      <h1 className="typing-effect">CSS Magic</h1>
    </div>
    <div className="created-by">Created by Ajnas N B</div></span>
      : null}
    </div>
  );
};

export default MatrixRain;
