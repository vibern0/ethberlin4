import React, { useEffect, useState } from "react";
import { supabase } from "../utils/db";
import Link from "next/link";
import { useUserContext } from "@/contexts/UserContext";

interface Quest {
  id: number;
  name: string;
  description: string;
  mentees: { mentee_id: number; mentee_identifier: string }[]; // Assuming mentees are represented as an array of strings
}

function Quests() {
  const { userId } = useUserContext();
  const [quests, setQuests] = useState<Quest[]>([]);

  useEffect(() => {
    const loadQuestsAndMentees = async () => {
      const { data: user_data } = await supabase
        .from("app_user")
        .select("id")
        .eq("identifier", userId)
        .single();

      console.log();

      await supabase
        .from("app_mentor_quest")
        .select("*")
        .eq("user_id", user_data?.id)
        .then(({ data: quests, error }) => {
          if (error) {
            console.error("Error fetching quests", error);
            return;
          }

          console.log(quests);

          const fetchMentees = quests.map((quest) =>
            supabase
              .from("mentor_requests")
              .select("*")
              .eq("connection_id", quest.id)
              .then(({ data: mentees, error }) => ({ ...quest, mentees }))
          );

          Promise.all(fetchMentees).then((updatedQuests) =>
            setQuests(updatedQuests)
          );
        });
    };
    loadQuestsAndMentees();
  }, []);

  return (
    <div>
      <h1>Quests</h1>
      {quests.map((quest) => (
        <div
          key={quest.id}
          style={{ backgroundColor: "gray", margin: 5, padding: 5 }}
        >
          <h2>title: {quest.name}</h2>
          <p>description: {quest.description}</p>
          <h4>mentees</h4>
          <ul>
            {quest.mentees.map((mentee) => (
              <Link
                key={mentee.mentee_id}
                href={`/mentees/${mentee.mentee_id}/review`}
              >
                View Mentee
              </Link>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Quests;
