import React, { useState } from "react";

interface SearchResult {
  id: number;
  name: string;
}

const SearchRoute: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = () => {
    // Mocking search results for demonstration purposes
    // TODO: query db
    const mockedResults: SearchResult[] = [
      { id: 1, name: "Result 1" },
      { id: 2, name: "Result 2" },
      { id: 3, name: "Result 3" },
    ];

    // Filtering the mocked results based on the search term
    const filteredResults = mockedResults.filter((result) =>
      result.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchRoute;
