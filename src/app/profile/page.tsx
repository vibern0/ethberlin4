"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../utils/db";
import { useUserContext } from "@/contexts/UserContext";
import { Box, TextField, Button, Typography } from "@mui/material";
import Quests from "./Quests";

const Route: React.FC = () => {
  const { userId } = useUserContext();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [isReadOnly, setIsReadOnly] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("app_user")
        .select("username, bio")
        .eq("identifier", userId)
        .single();

      if (data && !error) {
        setUsername(data.username || "");
        setBio(data.bio || "");
        setIsReadOnly(!!(data.username || data.bio));
      } else {
        setIsReadOnly(false);
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("app_user")
        .select("username, bio")
        .eq("identifier", userId);

      if (error) {
        console.error("Error fetching user", error, userId);
        return;
      }

      setUsername(data[0]?.username);
      setBio(data[0]?.bio);
    };

    fetchUser();
  }, [userId]);

  const handleSubmitUser = async () => {
    const { error } = await supabase
      .from("app_user")
      .update({ username, bio })
      .eq("identifier", userId);

    if (error) {
      console.error("Error updating user", error);
      return;
    }

    setIsReadOnly(true);
  };

  const handleEdit = () => {
    setIsReadOnly(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 64px)",
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 5,
          border: "1px solid #19473f",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Your profile
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Add your username here"
          disabled={isReadOnly}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#19473f",
              },
            },
          }}
        />
        <TextField
          label="Bio"
          variant="outlined"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Add your bio here"
          disabled={isReadOnly}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#19473f",
              },
            },
          }}
        />
        <Button
          variant="contained"
          color="success"
          onClick={isReadOnly ? handleEdit : handleSubmitUser}
          sx={{
            backgroundColor: "#19473f",
            color: "#fff",
            mt: 2,
            mb: -2,
          }}
        >
          {isReadOnly ? "Edit" : "Submit"}
        </Button>
      </Box>
      {username && <Quests />}
    </Box>
  );
};

export default Route;
