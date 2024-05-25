"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../utils/db";
import { Tables } from "../supabase";

const Route: React.FC = () => {
  const [topicTitle, setTopicTitle] = useState("");
  const [topicDescription, setTopicDescription] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [identifier, setIdentifier] = useState(
    "938447a0-71cd-43af-9c7b-3abe484285b7"
  ); // TODO: use the actual user identifier
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [mentees, setMentees] = useState<Tables<"mentor_requests">[]>([]);

  const isMentor = true;
  useEffect(() => {
    const loadMentees = async () => {
      let { data: mentor_requests, error: errorRead } = await supabase
        .from("mentor_requests")
        .select("*")
        .eq("mentor_identifier", identifier);

      if (errorRead || !mentor_requests) {
        console.error("Error reading mentor_requests", errorRead);
        return;
      }
      setMentees(mentor_requests);
    };
    loadMentees();
  }, []);

  const handleAccept = async (requestId: number) => {
    //
  };

  const handleDecline = async (requestId: number) => {
    //
  };

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
      <section>
        <h2>Mentees</h2>
        <ul>
          {mentees.map((mentee) => (
            <li key={mentee.mentee_username}>
              {mentee.mentee_username || mentee.mentee_identifier} -{" "}
              {mentee.request_status === null
                ? "Pending"
                : mentee.request_status
                ? "Approved"
                : "Declined"}
              {mentee.request_status === null && (
                <>
                  <button onClick={() => handleAccept(mentee.connection_id!)}>
                    Accept
                  </button>
                  <button onClick={() => handleDecline(mentee.connection_id!)}>
                    Decline
                  </button>
                </>
              )}
              {mentee.request_status && (
                <span> | Channel: {mentee.channel}</span>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Route;
