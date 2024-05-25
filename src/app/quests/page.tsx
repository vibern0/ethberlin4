"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../utils/db";
import { Tables } from "../supabase";

const ListComponent: React.FC<{}> = () => {
  const [items, setItems] = useState<
    Tables<"accepted_connections_with_quests">[]
  >([]);
  useEffect(() => {
    const loadEvaludations = async () => {
      const { data: evaluations, error } = await supabase
        .from("accepted_connections_with_quests")
        .select("*")
        .eq("mentee_identifier", "f90e806e-bf07-44c9-a6ea-d0f822825d62");

      if (!evaluations || evaluations.length === 0 || error) {
        console.error("Error reading evaluations", error);
        return;
      }

      setItems(evaluations);
    };
    loadEvaludations();
  }, []);

  const handleUpvote = async (id: number) => {
    await supabase
      .from("app_user_connections")
      .update({ updownvote: true })
      .eq("id", id);
  };

  const handleDownvote = async (id: number) => {
    await supabase
      .from("app_user_connections")
      .update({ updownvote: false })
      .eq("id", id);
  };

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.connection_id}>
            {item.quest_title} - {item.mentor_id} -{" "}
            {item.updownvote ? "Evaluated" : "Not Evaluated"}
            {!item.updownvote &&
              new Date(item.quest_expire_at!) < new Date() && (
                <div>
                  <button onClick={() => handleUpvote(item.connection_id!)}>
                    upvote
                  </button>
                  <button onClick={() => handleDownvote(item.connection_id!)}>
                    downvote
                  </button>
                </div>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListComponent;
