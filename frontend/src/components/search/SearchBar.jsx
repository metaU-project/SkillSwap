import { useState, useEffect } from 'react';
import './SearchBar.css';
import { MdClear } from 'react-icons/md';

function SearchBar({ onSearch, fetchSuggestions }) {
  const [input, setInput] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showClearButton, setShowClearButton] = useState(false);

  useEffect(() => {
    if (!input || typeof input !== 'string') {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        const response = await fetchSuggestions(input);
        if (response.error) {
          setFilteredSuggestions([]);
        }
        setFilteredSuggestions(response);
        setShowSuggestions(true);
      } catch (error) {
        console.error(error);
        setFilteredSuggestions([]);
      }
    }, 500);
    return () => clearTimeout(delay);
  }, [input, fetchSuggestions]);

  const handleSelect = (suggestion) => {
    setInput(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
  };

  const handleClear = () => {
    setInput('');
    setShowSuggestions(false);
    setShowClearButton(false);
  };

  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search skills..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setShowClearButton(e.target.value.trim() !== '');
          }}
          onFocus={() => input && setShowSuggestions(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSelect(input);
          }}
        />
        {showClearButton && (
          <MdClear onClick={handleClear} className="clear-btn" />
        )}
      </div>

      {showSuggestions && (
        <div className="suggestions-dropdown">
          {filteredSuggestions?.map((s, idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(s)}
              className="suggestion-item"
            >
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
