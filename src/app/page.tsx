"use client";
import { SnackbarProvider } from "notistack";
import { Landing } from "./components/Landing/Landing";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useUserContext } from "@/contexts/UserContext";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { loggedIn, isMentor} = useUserContext();

  useEffect(() => {
    if (loggedIn) {
      router.push(isMentor ? "/profile" : "/search");
    } else {
      setLoading(false);
    }
  }, [loggedIn]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 64px)"
      >
        <CircularProgress sx={{ color: '#008000' }} />
      </Box>
    );
  }

  return (
    <SnackbarProvider>
      <Landing />
    </SnackbarProvider>
  );
}
