"use client";
// contexts/UserContext.tsx
import React, { useState, createContext, useContext } from "react";
import { useCookies } from "next-client-cookies";

interface UserContextType {
  userId: string | undefined;
  setUserId: (userId: string) => void;
  userEmail: string | undefined;
  setUserEmail: (email: string) => void;
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
  logout: () => void;
  social: string | undefined;
  setSocial: (social: string) => void;
  isMentor: boolean;
  setIsMentor: (isMentor: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const cookieStore = useCookies();
  const [userId, setUserId_] = useState<string>(
    cookieStore.get("userId") || ""
  );
  const [userEmail, setUserEmail_] = useState<string>(
    cookieStore.get("userEmail") || ""
  );
  const [loggedIn, setLoggedIn] = useState<boolean>(
    cookieStore.get("userId") ? true : false
  );
  const [isMentor, setIsMentor_] = useState<boolean>(
    cookieStore.get("isMentor") ? true : false
  );
  const [social, setSocial_] = useState<string>(
    cookieStore.get("social") || ""
  );

  const setUserId = (userId: string) => {
    setUserId_(userId);
    cookieStore.set("userId", userId);
  };

  const setUserEmail = (email: string) => {
    setUserEmail_(email);
    cookieStore.set("userEmail", email);
  };

  const setIsMentor = (isMentor: boolean) => {
    setIsMentor_(isMentor);
    cookieStore.set("isMentor", isMentor.toString());
  };

  const setSocial = (social: string) => {
    setSocial_(social);
    cookieStore.set("social", social);
  }

  const logout = () => {
    setUserId("");
    setUserEmail("");
    setIsMentor(false);
    setLoggedIn(false);
    setSocial("");
    cookieStore.remove("userId");
    cookieStore.remove("isMentor");
    cookieStore.remove("social");
    cookieStore.remove("userEmail");
  };

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        userEmail,
        setUserEmail,
        loggedIn,
        setLoggedIn,
        isMentor,
        social,
        setSocial,
        setIsMentor,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
