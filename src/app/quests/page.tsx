"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../utils/db";

interface ListItem {
  id: number;
  from: string;
  evaluated: boolean;
}

interface Props {
  items: ListItem[];
}

const ListComponent: React.FC<Props> = () => {
  const [items, setItems] = useState<ListItem[]>([]);
  useEffect(() => {
    const loadEvaludations = async () => {
      const { data: evaluations, error } = await supabase
        .from("app_user_connections")
        .select("*")
        .eq("from", 5);

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
          <li key={item.id}>
            {item.from}
            {!item.evaluated && (
              <div>
                <button onClick={() => handleUpvote(item.id)}>upvote</button>
                <button onClick={() => handleDownvote(item.id)}>
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
