"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../utils/db";
import { useUserContext } from "@/contexts/UserContext";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import Quests from "./quests";

const Route: React.FC = () => {
  const { userId, isMentor } = useUserContext();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [social, setSocial] = useState("");
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [snackOpen, setsnackOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = () => {
    setsnackOpen(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("app_user")
        .select("username, social, bio")
        .eq("identifier", userId)
        .single();
      console.log(data);

      if (data && !error) {
        setUsername(data.username || "");
        setSocial(data.social || "");
        setBio(data.bio || "");
        setIsReadOnly(!!(data.username && data.social && data.bio));
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
        .select("username, social, bio")
        .eq("identifier", userId);

      if (error) {
        console.error("Error fetching user", error, userId);
        return;
      }

      setUsername(data[0]?.username);
      setSocial(data[0]?.social);
      setBio(data[0]?.bio);
    };

    fetchUser();
  }, [userId]);

  const handleSubmitUser = async () => {
    if (!username || !social || !bio) {
      setMessage("Please fill out all fields");
      setsnackOpen(true);
      return;
    }

    if (!social.includes(":")) {
      setMessage("Please ensure you add your homeserver (e.g. :matrix.org)");
      setsnackOpen(true);
      return;
    }

    if (!social.includes("@")) {
      setSocial(`@${social}`);
    }

    const { error } = await supabase
      .from("app_user")
      .update({ username, social, bio })
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
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: "1 0 auto",
          marginTop: "3em",
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
            sx: 2,
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
            label="Username"
            variant="outlined"
            value={social}
            onChange={(e) => setSocial(e.target.value)}
            placeholder="Add your matrix username here"
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
        {username && isMentor && <Quests />}
      </Box>
      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
      >
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Route;
