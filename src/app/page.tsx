"use client";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";

export default function Home() {
  return (
    <>
      <CssBaseline />
      <SnackbarProvider></SnackbarProvider>
    </>
  );
}
