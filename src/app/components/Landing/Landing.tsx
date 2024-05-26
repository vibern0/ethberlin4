import { Box, Button } from "@mui/material";
import { supabase } from "../../utils/db";
import { useLogin } from "../../hooks/useLogin";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/contexts/UserContext";

export const Landing: React.FC = () => {
  const { login, loggedIn } = useLogin();
  const { userId } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("app_user")
        .select("username, bio")
        .eq("identifier", userId)
        .single();

      if (loggedIn) {
        if (data && !error) {
          router.push("/search");
        } else {
          router.push("/profile");
        }
      }
    };

    fetchData();
  }, [loggedIn, router, userId]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10, // Increase this value to add more space between the buttons
        height: "calc(100vh - 64px)", // Subtract the height of the AppBar
      }}
    >
      <Button
        variant="contained"
        color="success"
        sx={{ fontSize: "1.5rem", py: 4, px: 4, backgroundColor: "#19473f" }}
        onClick={login}
      >
        Mentors
      </Button>
      <Button
        variant="contained"
        color="success"
        sx={{ fontSize: "1.5rem", py: 4, px: 4, backgroundColor: "#19473f" }}
        onClick={login}
      >
        Mentees
      </Button>
    </Box>
  );
};
