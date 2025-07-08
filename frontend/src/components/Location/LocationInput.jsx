import React, { useEffect, useState } from 'react';
import './LocationInput.css';

const LocationInput = ({ location, setLocation }) => {
  const [query, setQuery] = useState('');
  const [suggestedLocations, setSuggestedLocations] = useState([]);
  const apiKey = import.meta.env.VITE_GEOCOMPLETE_API_KEY;

  useEffect(() => {
    if (query.length === 0) return;
    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&limit=5&apiKey=${apiKey}`
        );
        const data = await response.json();
        setSuggestedLocations(data.features || []);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 500);
    return () => clearTimeout(debounce);
  }, [query, apiKey]);

  const handleSelectLocation = (place) => {
      setLocation(place.properties.formatted);
      setQuery(place.properties.formatted);
    setSuggestedLocations([]);
  };

  return (
    <div className="location-wrapper">
      <input
        type="text"
        placeholder="Enter a location"
        value={query || location}
        onChange={(e) => {
          setQuery(e.target.value);
          setLocation('');
        }}
        className="location-input"
        autoComplete="off"
      />
      {suggestedLocations.length > 0 && (
        <ul className="suggestions-box">
          {suggestedLocations.map((s, i) => (
            <li
              key={i}
              onClick={() => handleSelectLocation(s)}
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
