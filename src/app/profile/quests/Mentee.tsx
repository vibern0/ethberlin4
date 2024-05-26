import { Tables } from "@/app/supabase";
import { supabase } from "@/app/utils/db";
import { useUserContext } from "@/contexts/UserContext";
import React, { useEffect, useState } from "react";

const Mentee = () => {
  const { userId } = useUserContext();
  const [mentees, setMentees] = useState<Tables<"app_mentor_quest">[]>([]);

  useEffect(() => {
    const loadMenteeQuests = async () => {
      const { data: mentees, error } = await supabase
        .from("app_mentor_quest")
        .select("*")
        .eq("mentee_id", userId);

      if (error) {
        console.error("Error fetching mentees", error);
        return;
      }

      setMentees(mentees);
    };
    loadMenteeQuests();
  }, []);

  return (
    <div>
      <h1>Mentees</h1>
      <ul>
        {mentees.map((mentee) => (
          <li key={mentee.id}>
            {mentee.title} - {mentee.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Mentee;
