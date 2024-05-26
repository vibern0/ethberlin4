import React, { useEffect, useState } from "react";
import { supabase } from "@/app/utils/db";
import Link from "next/link";
import { useUserContext } from "@/contexts/UserContext";
import { Card, CardContent, Grid, Typography } from "@mui/material";

interface Quest {
  id: number;
  name: string;
  description: string;
  mentees: {
    approved: {
      connection_id: number;
      mentee_id: number;
      mentee_identifier: string;
    }[];
    pending: {
      connection_id: number;
      mentee_id: number;
      mentee_identifier: string;
    }[];
  };
}

function Mentor() {
  const { userId } = useUserContext();
  const [quests, setQuests] = useState<Quest[]>([]);

  useEffect(() => {
    const loadQuestsAndMentees = async () => {
      const { data: user_data } = await supabase
        .from("app_user")
        .select("id")
        .eq("identifier", userId)
        .single();

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
              .then(({ data: mentees, error }) => ({
                ...quest,
                mentees: {
                  approved: mentees?.filter((m) => m.request_status === true),
                  pending: mentees?.filter((m) => m.request_status === null),
                },
              }))
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
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{
                      backgroundColor: "#a1c0a1",
                      borderRadius: "50%",
                      height: 40,
                      width: 40,
                      textAlign: "center",
                      alignContent: "center",
                    }}
                  >
                    {quest.mentees.pending.map((mentee) => (
                      <Link
                        key={mentee.mentee_id}
                        href={`/mentees/${mentee.connection_id}/review`}
                      >
                        {mentee.mentee_id}
                      </Link>
                    ))}
                  </div>
                  <div
                    style={{
                      backgroundColor: "#a1c0a1",
                      borderRadius: "50%",
                      height: 40,
                      width: 40,
                      textAlign: "center",
                      alignContent: "center",
                    }}
                  >
                    {quest.mentees.approved.map((mentee) => (
                      <Link
                        key={mentee.mentee_id}
                        href={`/mentees/${mentee.connection_id}/review`}
                      >
                        {mentee.mentee_id}
                      </Link>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Mentor;
