"use client";
import React, { useState } from "react";
import { supabase } from "../../utils/db";
import { Alert } from "@mui/lab";
import { useUserContext } from "@/contexts/UserContext";
import {
  Button,
  Container,
  Grid,
  TextField,
  Box,
  Snackbar,
} from "@mui/material";
import { useRouter } from "next/navigation";

const Route: React.FC = () => {
  const { userId } = useUserContext();
  const [topicTitle, setTopicTitle] = useState("");
  const [topicDescription, setTopicDescription] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (!topicTitle || !topicDescription || !timeframe) {
      setOpen(true);
      return;
    }

    let { data: app_user, error: errorRead } = await supabase
      .from("app_user")
      .select("id")
      .eq("identifier", userId)
      .single();

    if (errorRead || !app_user) {
      console.error("Error reading app_user", errorRead);
      return;
    }

    router.push("/profile"); // Move to the new page first

    const { error: errorWrite } = await supabase
      .from("app_mentor_quest")
      .insert({
        user_id: app_user.id,
        title: topicTitle,
        description: topicDescription,
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
    <Container maxWidth="sm" sx={{ height: "calc(100vh - 64px)" }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="top"
        minHeight="100vh"
      >
        <Grid container spacing={3} direction="column">
          <Grid item>
            <h2>Update Topic and Timeframe</h2>
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              type="text"
              placeholder="Enter topic title"
              value={topicTitle}
              onChange={(e) => setTopicTitle(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              type="text"
              placeholder="Enter topic description"
              value={topicDescription}
              onChange={(e) => setTopicDescription(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              type="date"
              placeholder="Select timeframe"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="success"
              sx={{
                fontSize: "1rem",
                py: 2,
                px: 2,
                backgroundColor: "#19473f",
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Please fill out all fields"
      >
        <Alert onClose={handleClose} severity="error">
          Please fill out all fields
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Route;
