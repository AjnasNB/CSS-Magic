// Ask.js

import React, { useState } from "react";
import "./ask.css"; // Ensure this path matches your file structure
import { BiCopy, BiSolidMagicWand } from "react-icons/bi";

const Ask = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAsk = async () => {
    if (question.trim() !== "") {
      setIsGenerating(true);
      try {
        const response = await fetch(process.env.REACT_APP_CSS_API_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: "Generate css for "+question }),
        });

        const data = await response.json();
        setIsGenerating(false);
        setAnswer(data.response);

        processCssStyles(data.response);
      } catch (error) {
        console.error("An error occurred:", error);
        setIsGenerating(false);
      }
    }
  };

  const processCssStyles = (answer) => {
    const cssSnippets = extractCssSnippets(answer);

    if (cssSnippets.length > 0) {
      const formattedSnippets = cssSnippets.map((snippet, index) => (
        <div key={index} className="query-block">
          <pre>
            <code>{snippet}</code>
          </pre>
          <button onClick={() => handleCopy(snippet)}>
            <BiCopy />
          </button>
        </div>
      ));

      setAnswer(formattedSnippets);
    } else {
      setAnswer("No CSS generated. Please refine your question or code snippet.");
    }
  };

  const extractCssSnippets = (text) => {
    const regex = /```css([\s\S]*?)```/g;
    const matches = text.match(regex) || [];
    return matches.map((match) => match.replace(/```css|```/g, "").trim());
  };

  const handleCopy = (snippet) => {
    const textArea = document.createElement("textarea");
    textArea.value = snippet;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  };

  return (
    <div className="container">
      <div className="question-bar">
        <div className="ask-info">
          <h1>Generate CSS from natural language or code</h1>
          <p className="ask-info-text">Feel free to describe the style you want or enter React or HTML code directly, and we'll generate the CSS for you.</p>
        </div>
        <textarea
          className="question-textarea"
          placeholder="Describe a style or paste your React/HTML code here...
          Make sure to be as descriptive as possible or ensure your code is well-formatted."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button onClick={handleAsk} disabled={isGenerating}>
          {isGenerating ? <span>Generating...</span> : <span><BiSolidMagicWand /> Do the magic</span>}
        </button>
      </div>
      {answer && <div className="answer-card">{answer}</div>}
    </div>
  );
};

export default Ask;
