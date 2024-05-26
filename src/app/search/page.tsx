"use client";
import {
  Typography,
  List,
  Box,
  ListItem,
  ListItemText,
  Button,
  Divider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { supabase } from "../utils/db";
import Link from "next/link";
import { useUserContext } from "@/contexts/UserContext";

interface SearchResult {
  mentor_id: number;
  mentor_identifier: string;
  social: object;
  username: string;
  bio: string;
  topic_title: string;
  topic_description: string;
  connection_status: boolean;
  events: object;
}

function SearchRoute() {
  const { userId } = useUserContext();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  useEffect(() => {
    const loadSearchResults = async () => {
      const { data: mentors_by_topic, error } = await supabase.rpc(
        "get_mentors_with_connection_status",
        {
          current_user_identifier: userId,
        }
      );

      if (!mentors_by_topic || mentors_by_topic.length === 0 || error) {
        console.error("Error reading mentors_by_topic", error);
        return;
      }

      setSearchResults(mentors_by_topic);
    };
    loadSearchResults();
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="top"
      height="calc(100vh - 64px)"
    >
      <List>
        {searchResults.map((result, index) => (
          <>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="40vw" // Set a certain width
            >
              <ListItem
                key={`mentor${result.mentor_id}`}
                alignItems="flex-start"
              >
                <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                  <ListItemText
                    primary={
                      <>
                        <strong>Mentor:</strong>{" "}
                        {result.username || result.mentor_identifier}
                      </>
                    }
                    secondary={
                      <>
                        <Typography flex={1}>
                          <strong>Bio:</strong> {result.bio}
                        </Typography>{" "}
                        {/* Remove noWrap */}
                        <Typography noWrap flex={1}>
                          <strong>Topic:</strong> {result.topic_title}
                        </Typography>
                        <Typography flex={1}>
                          <strong>Description:</strong>{" "}
                          {result.topic_description}
                        </Typography>
                        <Typography flex={1}>
                          <strong>Connections:</strong>{" "}
                          {result.connection_status}
                        </Typography>
                      </>
                    }
                    sx={{ flexGrow: 1, marginRight: 2 }}
                  />
                  <Box display="flex" justifyContent="center">
                    <Link href={`/search/apply/${result.mentor_id}`} passHref>
                      <Button
                        variant="contained"
                        color="success"
                        sx={{
                          fontSize: "1rem",
                          py: 2,
                          px: 2,
                          backgroundColor: "#19473f",
                        }}
                      >
                        Apply
                      </Button>
                    </Link>
                  </Box>
                </Box>
              </ListItem>
            </Box>
            {index < searchResults.length - 1 && <Divider />}{" "}
          </>
        ))}
      </List>
    </Box>
  );
}

export default SearchRoute;
