import React, { useEffect, useState } from 'react';
import './LocationInput.css';

const LocationInput = ({ location, setLocation }) => {
  const [query, setQuery] = useState('');
  const [suggestedLocations, setSuggestedLocations] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const apiKey = import.meta.env.VITE_GEOCOMPLETE_API_KEY;

  useEffect(() => {
    if (query.length < 2) {
      setSuggestedLocations([]);
      setShowSuggestions(false);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&limit=5&apiKey=${apiKey}`
        );
        const data = await response.json();
        setSuggestedLocations(data.features || []);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 500);
    return () => clearTimeout(debounce);
  }, [query, apiKey]);

  const handleSelectLocation = (place) => {
    const selectedLocation = place.properties.formatted;
    setLocation(selectedLocation);
    setQuery(selectedLocation);
    setSuggestedLocations([]);
    setShowSuggestions(false);
  };

  return (
    <div className="location-wrapper">
      <input
        type="text"
        placeholder="Enter a location"
        value={query !== '' ? query : location}
        onChange={(e) => {
          setQuery(e.target.value);
          setLocation('');
        }}
        className="location-input"
        autoComplete="off"
        onBlur={() => setTimeout(() => setSuggestedLocations([]), 100)}
      />
      {showSuggestions && suggestedLocations.length > 0 && (
        <ul className="suggestions-box">
          {suggestedLocations.map((s, i) => (
            <li
              key={i}
              onMouseDown={() => handleSelectLocation(s)}
              className="suggestion-item"
            >
              {s.properties.formatted}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationInput;
