"use client";
import CssBaseline from "@mui/material/CssBaseline";
import { Header } from "./components/Header/Header";
import { SnackbarProvider } from "notistack";
import { Landing } from "./components/Landing/Landing";

import { UserProvider } from "../contexts/UserContext";

export default function Home() {

  return (
    <>
      <SnackbarProvider>
        <UserProvider>
          <Landing />
        </UserProvider>
      </SnackbarProvider>
    </>
  );
}
