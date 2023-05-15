import React from 'react';
import WordFrequencyCounter from './WordFrequencyCounter';
import Navbar from "./Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <h1>Word Frequency Counter</h1>
      <WordFrequencyCounter />
    </div>
  );
};

export default App;
