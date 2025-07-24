import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../axios";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  
    const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    // Use the shared axios instance with the correct baseURL
    const res = await makeRequest.post("/auth/login", inputs);
    setCurrentUser(res.data);
  };

  useEffect(() => {
    
    localStorage.setItem("user", JSON.stringify(currentUser));
    //console.log('currentUser:', currentUser);
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
