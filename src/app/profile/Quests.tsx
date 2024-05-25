import React, { useEffect, useState } from "react";
import { supabase } from "../utils/db";
import Link from "next/link";

interface Quest {
  id: number;
  name: string;
  description: string;
  mentees: { mentee_id: number; mentee_identifier: string }[]; // Assuming mentees are represented as an array of strings
}

const Quests: React.FC = () => {
  const [quests, setQuests] = useState<Quest[]>([]);

  useEffect(() => {
    const loadQuestsAndMentees = async () => {
      await supabase
        .from("app_mentor_quest")
        .select("*")
        .then(({ data: quests, error }) => {
          if (error) {
            console.error("Error fetching quests", error);
            return;
          }

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

      loadQuestsAndMentees();
    };
  }, []);

  return (
    <div>
      <h1>Quests</h1>
      {quests.map((quest) => (
        <div key={quest.id}>
          <h2>{quest.name}</h2>
          <p>{quest.description}</p>
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
};

export default Quests;
