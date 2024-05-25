"use client";
import React, { useState } from "react";
import { supabase } from "../utils/db";

const Route: React.FC = () => {
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = async () => {
    let { data: app_user, error: errorRead } = await supabase
      .from("app_user")
      .select("id")
      // TODO: use the actual user identifier
      .eq("identifier", "X")
      .single();

    if (errorRead || !app_user) {
      console.error("Error reading app_user", errorRead);
      return;
    }

    const { error: errorWrite } = await supabase
      .from("app_user_mentor")
      .insert({ userId: app_user.id, topic, duration })
      .select();

    if (errorWrite) {
      console.error("Error writing to DB", errorWrite);
      return;
    }

    // TODO: some toast!
    setTopic("");
    setDuration("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter duration"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Route;
