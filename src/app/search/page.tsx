"use client";
import React, { useState } from "react";
import { supabase } from "../utils/db";

interface SearchResult {
  mentor_id: number;
  mentor_identifier: string;
  social: object;
}

function SearchRoute() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = async () => {
    let { data: mentors_by_topic, error } = await supabase
      .from("mentors_by_topic")
      .select("mentor_id,mentor_identifier,social,topic,expire_at")
      .eq("topic", searchTerm);

    if (!mentors_by_topic || mentors_by_topic.length === 0 || error) {
      console.error("Error reading mentors_by_topic", error);
      return;
    }

    setSearchResults(mentors_by_topic);
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
          <li key={result.mentor_id}>{result.mentor_identifier}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchRoute;
