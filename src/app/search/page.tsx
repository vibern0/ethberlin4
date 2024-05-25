"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../utils/db";

interface SearchResult {
  mentor_id: number;
  mentor_identifier: string;
  social: object;
  username: string;
  bio: string;
}

function SearchRoute() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  useEffect(() => {
    const loadSearchResults = async () => {
      let { data: mentors_by_topic, error } = await supabase
        .from("mentors_by_topic")
        .select(
          "mentor_id,mentor_identifier,social,username,bio,topic,expire_at"
        );

      if (!mentors_by_topic || mentors_by_topic.length === 0 || error) {
        console.error("Error reading mentors_by_topic", error);
        return;
      }

      setSearchResults(mentors_by_topic);
    };
    loadSearchResults();
  }, []);

  return (
    <ul>
      {searchResults.map((result) => (
        <li key={result.mentor_id}>
          {result.username || result.mentor_identifier} ({result.bio})
        </li>
      ))}
    </ul>
  );
}

export default SearchRoute;
