import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ui/use-toast";

interface User {
  id: string;
  email: string;
  role: "admin" | "user";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: "admin" | "user") => void;
  signup: (email: string, password: string, role: "admin" | "user") => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Simulated auth functions
  const login = (email: string, password: string, role: "admin" | "user") => {
    // In a real app, this would make an API call
    console.log("Logging in:", { email, password, role });
    setUser({ id: "1", email, role });
    localStorage.setItem("user", JSON.stringify({ id: "1", email, role }));
    toast({
      title: "Logged in successfully",
      description: `Welcome back, ${email}!`,
    });
    navigate(role === "admin" ? "/admin/dashboard" : "/dashboard");
  };

  const signup = (email: string, password: string, role: "admin" | "user") => {
    // In a real app, this would make an API call
    console.log("Signing up:", { email, password, role });
    setUser({ id: "1", email, role });
    localStorage.setItem("user", JSON.stringify({ id: "1", email, role }));
    toast({
      title: "Account created successfully",
      description: "Welcome to our platform!",
    });
    navigate(role === "admin" ? "/admin/dashboard" : "/dashboard");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logged out successfully",
      description: "Come back soon!",
    });
    navigate("/");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
