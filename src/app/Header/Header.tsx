// components/Header.tsx
import { useState, useCallback, useMemo } from "react";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import ParkIcon from "@mui/icons-material/Park";
import { zuAuthPopup } from "@pcd/zuauth";
import { ZUAUTH_CONFIG } from "../utils/zupassConstants";
import { useUserContext } from "../../contexts/UserContext";
import { enqueueSnackbar } from "notistack";
import { createAvatar } from "@dicebear/core";
import { identicon } from "@dicebear/collection";

// Specify fields to request from Zopass.
const fieldsToReveal = {
  revealAttendeeEmail: true,
  revealAttendeeSemaphoreId: true,
};

export const Header: React.FC = () => {
  const { userId, loggedIn, setLoggedIn, setUserId, setUserEmail } =
    useUserContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  /** Generate an avatar based on the user ID. */
  const avatarSvg = useMemo(() => {
    if (userId) {
      return createAvatar(identicon, {
        seed: userId,
      });
    }
    return "";
  }, [userId]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  /**
   * Retrieve the PCD (Proof-Carrying Data) using Zopass Zero Knowledge Proof authentication.
   */
  const getProof = useCallback(async () => {
    const result = await zuAuthPopup({
      fieldsToReveal,
      watermark: BigInt(12345),
      config: ZUAUTH_CONFIG,
    });
    if (result.type === "pcd") {
      const pdc = JSON.parse(result.pcdStr).pcd;
      await sendPCDToServer(pdc);
    } else {
      enqueueSnackbar(
        "ZuPass authentication failed. Please report to the conference organizer.",
        { variant: "error" }
      );
    }
  }, [loggedIn]);

  /**
   * Verify the PCD on the backend.
   */
  const sendPCDToServer = async (pcd: any) => {
    let response;
    try {
      response = await fetch("/api/verify", {
        method: "POST",
        body: JSON.stringify({
          pcd: pcd,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      enqueueSnackbar(`Error: ${e}`, { variant: "error" });
      return;
    }

    const data = await response.json();
    if (response.status !== 200) {
      enqueueSnackbar(`Error: ${data.message}`, { variant: "error" });
      return;
    }
    setUserId(pcd);
    setUserEmail(pcd);
    setLoggedIn(true);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#19473f" }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="home">
          <ParkIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Pomar
        </Typography>
        {loggedIn ? (
          <>
            <IconButton onMouseEnter={handleMenuOpen} sx={{ background: '#add8e6' }} size="small">
              <Avatar
                alt="User Avatar"
                src={`data:image/svg+xml;utf8,${encodeURIComponent(
                  avatarSvg as string
                )}`}
              />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              MenuListProps={{ onMouseLeave: handleMenuClose }}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  setLoggedIn(false);
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Button color="inherit" onClick={getProof} variant="outlined">
            Login with ZuPass
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
