import React, { useEffect, useState } from "react";
import { supabase } from "../utils/db";
import Link from "next/link";
import { useUserContext } from "@/contexts/UserContext";
import { Card, CardContent, Grid, Typography } from "@mui/material";

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

          const fetchMentees = quests.map((quest) =>
            supabase
              .from("mentor_requests")
              .select("*")
              .eq("quest_id", quest.id)
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
    <>
      <Typography variant="h2" align="center" sx={{ pt: 2 }}>
        Quests
      </Typography>
      <Grid
        container
        spacing={2}
        maxWidth="lg"
        sx={{ marginBottom: "20px", px: 2 }}
      >
        {quests.map((quest) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={quest.id}>
            <Card
              variant="outlined"
              style={{ backgroundColor: "white", margin: 5, padding: 5 }}
            >
              <CardContent>
                <Typography variant="h5">title: {quest.name}</Typography>
                <Typography variant="body1">
                  description: {quest.description}
                </Typography>
                <Typography variant="h6">mentees</Typography>
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Quests;
