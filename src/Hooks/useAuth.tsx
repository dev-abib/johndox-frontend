import { useContext } from "react";
import { AuthContextProvider } from "@/Provider/AuthProvider/AuthProvider";

const useAuth = () => {
  const context = useContext(AuthContextProvider);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context; 
};

export default useAuth;
