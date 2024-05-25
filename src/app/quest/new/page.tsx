"use client";
import React, { useState } from "react";
import { supabase } from "../../utils/db";
import { useUserContext } from "@/contexts/UserContext";

const Route: React.FC = () => {
  const { userId } = useUserContext();
  const [topicTitle, setTopicTitle] = useState("");
  const [topicDescription, setTopicDescription] = useState("");
  const [timeframe, setTimeframe] = useState("");

  const handleSubmit = async () => {
    let { data: app_user, error: errorRead } = await supabase
      .from("app_user")
      .select("id")
      .eq("identifier", userId)
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
    </div>
  );
};

export default Route;
