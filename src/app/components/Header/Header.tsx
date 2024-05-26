"use client";
import { useState, useMemo } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Button,
  Divider,
  Grid,
} from "@mui/material";
import ParkIcon from "@mui/icons-material/Park";
import { useUserContext } from "../../../contexts/UserContext";
import { createAvatar } from "@dicebear/core";
import { identicon } from "@dicebear/collection";
import { useRouter } from "next/navigation";

export const Header: React.FC = () => {
  const { userId, loggedIn, logout, isMentor } = useUserContext();
  const router = useRouter();
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
    router.push("/profile");
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#19473f" }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="home">
          <ParkIcon />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            paddingRight: "1.5rem",
          }}
        >
          Pomar
        </Typography>
        {loggedIn && (
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => router.push(isMentor ? "/quest/new" : "/search")}
          >
            {isMentor ? "Create new Quest" : "Find Quests"}
          </Button>
        )}
        <Box flexGrow={1} />
        {loggedIn ? (
          <>
            <IconButton
              onMouseEnter={handleMenuOpen}
              sx={{ background: "#add8e6" }}
              size="small"
            >
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
                  handleLogout();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};
