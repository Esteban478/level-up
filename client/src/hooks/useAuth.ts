import { useCallback, useContext } from "react";
import { AuthContext } from "../context/Auth";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  const getToken = useCallback(() => {
    // Your token retrieval logic here
    return localStorage.getItem('token');
  }, []);
  
  return {
    ...context,
    getToken,
  };
};