// contexts/UserContext.tsx
import React, { useState, createContext, useContext } from 'react';

interface UserContextType {
  userId: string | undefined;
  setUserId: (userId: string) => void;
  userEmail: string | undefined;
  setUserEmail: (email: string) => void;
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<string>();
    const [userEmail, setUserEmail] = useState<string>();
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    return (
        <UserContext.Provider value={{ userId, setUserId, userEmail, setUserEmail, loggedIn, setLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
