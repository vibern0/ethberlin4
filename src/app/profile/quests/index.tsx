import React from "react";
import { useUserContext } from "@/contexts/UserContext";
import Mentee from "./Mentee";
import Mentor from "./Mentor";

const ProfileQuests: React.FC = () => {
  const { isMentor } = useUserContext();

  return isMentor ? <Mentor /> : <Mentee />;
};

export default ProfileQuests;
