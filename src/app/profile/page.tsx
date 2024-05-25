"use client";
import React, { useState } from "react";
import { supabase } from "../utils/db";

const Route: React.FC = () => {
  const [topicTitle, setTopicTitle] = useState("");
  const [topicDescription, setTopicDescription] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [identifier, setIdentifier] = useState("X"); // TODO: use the actual user identifier
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const handleSubmit = async () => {
    let { data: app_user, error: errorRead } = await supabase
      .from("app_user")
      .select("id")
      .eq("identifier", identifier)
      .single();

    if (errorRead || !app_user) {
      console.error("Error reading app_user", errorRead);
      return;
    }

    const { error: errorWrite } = await supabase
      .from("app_user_mentor")
      .insert({
        user_id: app_user.id,
        topic_title: topicTitle,
        topic_description: topicDescription,
        expire_at: new Date(timeframe),
      })
      .select();

    if (errorWrite) {
      console.error("Error writing to DB", errorWrite);
      return;
    }

    // TODO: some toast!
    setTopicTitle("");
    setTopicDescription("");
    setTimeframe("");
  };

  const handleSubmitUser = async () => {
    const { data, error } = await supabase
      .from("app_user")
      .update({ username, bio })
      .eq("identifier", identifier)
      .select();

    if (!data || error) {
      console.error("Error updating user", error);
      return;
    }

    setUsername("");
    setBio("");
  };

  return (
    <div>
      <section>
        <h2>Update Topic and Timeframe</h2>
        <input
          type="text"
          placeholder="Enter topic title"
          value={topicTitle}
          onChange={(e) => setTopicTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter topic description"
          value={topicDescription}
          onChange={(e) => setTopicDescription(e.target.value)}
        />
        <input
          type="date"
          placeholder="Select timeframe"
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </section>
      <section>
        <h2>Update Username and Bio</h2>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <button onClick={handleSubmitUser}>Submit</button>
      </section>
    </div>
  );
};

export default Route;
