"use client";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";
import { Landing } from "./components/Landing/Landing";

export default function Home() {
  return (
    <>
      <CssBaseline />
      <SnackbarProvider>
        <Landing />
      </SnackbarProvider>
    </>
  );
}
