import { useState } from 'react';
import axios from 'axios';

const LocationSearch = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const GEOCODE_API_KEY = 'ge-1ba07a8ac42bbb1b';

  const handleSearch = async (text) => {
    setQuery(text);
    if (text.length < 3) return;

    try {
      const res = await axios.get('https://api.geocode.earth/v1/search', {
        params: {
          text,
          api_key: GEOCODE_API_KEY,
          'boundary.country': 'KE'
        }
      });

      setResults(res.data.features || []);
    } catch (err) {
      console.error('Geocode search failed:', err);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search location..."
        className="w-full px-3 py-2 border rounded"
      />
      {results.length > 0 && (
        <ul className="absolute z-10 bg-white border rounded mt-1 w-full max-h-60 overflow-y-auto">
          {results.map((feature, idx) => (
            <li
              key={idx}
              onClick={() => {
                onSelect(feature);
                setQuery(feature.properties.label);
                setResults([]);
              }}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {feature.properties.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSearch;
