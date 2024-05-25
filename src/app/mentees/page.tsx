"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../utils/db";
import { Tables } from "../supabase";

const Route: React.FC = () => {
  const [identifier, setIdentifier] = useState(
    "938447a0-71cd-43af-9c7b-3abe484285b7"
  ); // TODO: use the actual user identifier
  const [mentees, setMentees] = useState<Tables<"mentor_requests">[]>([]);

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

  return (
    <div>
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
