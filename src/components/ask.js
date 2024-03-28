import React, { useState } from "react";
import "./ask.css";
import { BiCopy, BiSolidMagicWand } from "react-icons/bi";

const Ask = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  // Use an object to track the state of each copy button
  const [copyButtonStates, setCopyButtonStates] = useState({});

  const handleAsk = async () => {
    if (question.trim() !== "") {
      setIsGenerating(true);
      try {
        // Ensure you replace `process.env.REACT_APP_CSS_API_ENDPOINT` with your actual endpoint URL
        const response = await fetch(process.env.REACT_APP_CSS_API_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: "Generate css for " + question }),
        });

        const data = await response.json();
        setIsGenerating(false);
        processCssStyles(data.response); // Assuming `data.response` is the CSS or related response.
      } catch (error) {
        console.error("An error occurred:", error);
        setIsGenerating(false);
        setAnswer("Failed to generate CSS. Please try again.");
      }
    }
  };

  const processCssStyles = (cssResponse) => {
    const cssSnippets = extractCssSnippets(cssResponse);

    if (cssSnippets.length > 0) {
      const formattedSnippets = cssSnippets.map((snippet, index) => (
        <div key={index} className="query-block">
          <pre><code>{snippet}</code></pre>
          <button onClick={() => handleCopy(snippet, index)} className="copy-button">
            <BiCopy />
            {copyButtonStates[index] ? 'Copied!' : 'Copy'}
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

  const handleCopy = (snippet, index) => {
    const textArea = document.createElement("textarea");
    textArea.value = snippet;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    // Update the button state to "Copied!"
    setCopyButtonStates(prev => ({ ...prev, [index]: true }));
    setTimeout(() => {
      // Reset the button state back to "Copy" after a delay
      setCopyButtonStates(prev => ({ ...prev, [index]: false }));
    }, 5000);
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
          placeholder="Describe a style or paste your React/HTML code here... Make sure to be as descriptive as possible or ensure your code is well-formatted."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button onClick={handleAsk} disabled={isGenerating} className="generate-button">
          {isGenerating ? <span>Generating...</span> : <span><BiSolidMagicWand /> Do the magic</span>}
        </button>
      </div>
      <div className="answer-card">
        {typeof answer === "string" ? <p>{answer}</p> : answer}
      </div>
    </div>
  );
};

export default Ask;
