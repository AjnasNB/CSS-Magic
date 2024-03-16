
import { useEffect, useState } from 'react';
import './App.css';
import Ask from './components/ask';
import Footer from './components/footer';
import Header from './components/header';
import MatrixRain from './components/matrixRain';

function App() {
  const [showContent, setShowContent] = useState(false);
  useEffect(() => {
    // Delayed action after 3000 milliseconds (3 seconds)
    const delay = setTimeout(() => {
      setShowContent(true);
    }, 8000);

    // Clean up the timeout when the component unmounts or when dependencies change
    return () => {
      clearTimeout(delay);
    };
  }, []); 
  return (
    <div className="App">
    {showContent ? <span>
      <Header />
      <Ask />
      <Footer />
      </span> : <MatrixRain />}
    </div>
  );
}

export default App;
