"use client";
import { SnackbarProvider } from "notistack";
import { Landing } from "./components/Landing/Landing";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import { Box, CircularProgress } from "@mui/material";

export default function Home() {
  const router = useRouter();
  const cookies = useCookies();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cookies.get("userId")) {
      router.push("/search");
    } else {
      setLoading(false);
    }
  }, [cookies, router]);

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
