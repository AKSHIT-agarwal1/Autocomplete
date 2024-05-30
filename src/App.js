import React, { useState, useEffect } from 'react';
import SearchResults from './components/SearchResults';
import TextInput from './components/TextInput';

import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [usingKeyboard, setUsingKeyboard] = useState(false);

  useEffect(() => {
    fetch('https://fe-take-home-assignment.s3.us-east-2.amazonaws.com/Data.json')
      .then(async response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const movies = await response.json();
        setData(movies);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setUsingKeyboard(true);
      setHighlightedIndex((prevIndex) => Math.min(prevIndex + 1, filteredData.length - 1));
    } else if (e.key === 'ArrowUp') {
      setUsingKeyboard(true);
      setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(query.toLowerCase())
    )
  );

  return (
    <div
      id="container"
    >
      <TextInput
        type="text"
        query={query}
        handleInputChange={handleInputChange}
        placeholder="Search..."
        aria-label="Search"
      />
      {query && (
        <p>{`"${query}" found in the following Search Results`}</p>
      )}
      <SearchResults
        onKeyDown={handleKeyDown}
        data={filteredData}
        query={query}
        highlightedIndex={highlightedIndex}
        setHighlightedIndex={setHighlightedIndex}
        usingKeyboard={usingKeyboard}
        setUsingKeyboard={setUsingKeyboard}
      />
    </div>
  );
};

export default App;
