"use client";
import CssBaseline from "@mui/material/CssBaseline";
import { Header } from "./Header/Header";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

import { UserProvider } from "../contexts/UserContext";

export default function Home() {
  return (
    <>
      <CssBaseline />
      <SnackbarProvider>
        <UserProvider>
          <Header/>
        </UserProvider>
      </SnackbarProvider>
    </>
  );
}
