import { useState, useEffect } from 'react';
import './SearchBar.css';
import { MdClear } from "react-icons/md";

function SearchBar({ suggestions, onSearch }) {
    const [input, setInput] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showClearButton, setShowClearButton] = useState(false);

    useEffect(() => {
        if (input.trim()) {
            const filtered = suggestions.filter(s =>
                s.toLowerCase().includes(input.toLowerCase())
            );
            setFilteredSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    }, [input, suggestions]);

    const handleSelect = (suggestion) => {
        setInput(suggestion);
        setShowSuggestions(false);
        onSearch(suggestion);
    };

    const handleClear = () => {
        setInput('');
        setShowSuggestions(false);
    }

    return (
        <div className="search-bar-container">
            <div className='search-input-wrapper'>
            <input
                type="text"
                placeholder="Search skills..."
                value={input}
                onChange={(e) => {setInput(e.target.value); setShowClearButton(e.target.value.trim() !== '');}}
                onFocus={() => input && setShowSuggestions(true)}

            />
               {
                    showClearButton && <MdClear onClick={handleClear} className="clear-btn" />
                }

            </div>


            {showSuggestions && (
                <div className="suggestions-dropdown">
                    {filteredSuggestions.length > 0 ? (
                        filteredSuggestions.map((s, idx) => (
                            <div key={idx} onClick={() => handleSelect(s)} className="suggestion-item">
                                {s}
                            </div>
                        ))
                    ) : (
                        <div className="no-suggestions">No matches found</div>
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchBar;
