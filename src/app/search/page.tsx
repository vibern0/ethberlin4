"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../utils/db";

interface SearchResult {
  mentor_id: number;
  mentor_identifier: string;
  social: object;
  username: string;
  bio: string;
  topic_title: string;
  topic_description: string;
  connection_status: boolean;
  events: object;
}

function SearchRoute() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  useEffect(() => {
    const loadSearchResults = async () => {
      const { data: mentors_by_topic, error } = await supabase.rpc(
        "get_mentors_with_connection_status",
        {
          // TODO: get user identifier from the actual user
          current_user_identifier: "f90e806e-bf07-44c9-a6ea-d0f822825d62",
        }
      );

      if (!mentors_by_topic || mentors_by_topic.length === 0 || error) {
        console.error("Error reading mentors_by_topic", error);
        return;
      }

      setSearchResults(mentors_by_topic);
    };
    loadSearchResults();
  }, []);

  const handleAskMentor = async (mentor_id: number) => {
    const { data: app_user, error: errorRead } = await supabase
      .from("app_user")
      .select("id")
      .eq("identifier", "f90e806e-bf07-44c9-a6ea-d0f822825d62")
      .single();

    if (errorRead || !app_user) {
      console.error("Error reading app_user", errorRead);
      return;
    }

    const { error: errorWrite } = await supabase
      .from("app_user_connections")
      .insert({ from: app_user.id, to: mentor_id })
      .select();

    if (errorWrite) {
      console.error("Error writing to DB", errorWrite);
      return;
    }
    console.log("sent!");
    // TODO: update UI
  };

  return (
    <ul>
      {searchResults.map((result) => (
        <li key={result.mentor_id}>
          <div>
            <p>
              {result.username || result.mentor_identifier} ({result.bio}) (
              {result.topic_title}: {result.topic_description}) (
              {result.connection_status})
            </p>
            <button onClick={() => handleAskMentor(result.mentor_id)}>
              Ask mentor
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default SearchRoute;
