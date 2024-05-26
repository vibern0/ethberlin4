import { Box, Button } from "@mui/material";
import { useLogin } from "../../hooks/useLogin";
import { useUserContext } from "../../../contexts/UserContext";

export const Landing: React.FC = () => {
  const { setIsMentor } = useUserContext();
  const { login } = useLogin();

  const handleMentorLogin = () => {
    login();
    setIsMentor(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" }, // Stack the buttons vertically on small screens and horizontally on larger screens
        justifyContent: "center",
        alignItems: "center",
        gap: 10, // Increase this value to add more space between the buttons
        height: "calc(100vh - 64px)", // Subtract the height of the AppBar
        px: [2, 3, 4], // Add horizontal padding. Responsive array: [mobile, tablet, desktop]
      }}
    >
      <Button
        variant="contained"
        color="success"
        sx={{ fontSize: "1.5rem", py: 4, px: 4, backgroundColor: "#19473f" }}
        onClick={handleMentorLogin}
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
