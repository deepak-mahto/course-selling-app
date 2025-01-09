import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ui/use-toast";
import { BACKEND_URL } from "../config";

interface User {
  id: string;
  email: string;
  role: "admin" | "user";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: "admin" | "user") => void;
  signup: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: "admin" | "user"
  ) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const login = (email: string, password: string, role: "admin" | "user") => {
    console.log("Logging in:", { email, password, role });
    setUser({ id: "1", email, role });
    localStorage.setItem("user", JSON.stringify({ id: "1", email, role }));
    toast({
      title: "Logged in successfully",
      description: `Welcome back, ${email}!`,
    });
    navigate(role === "admin" ? "/admin/dashboard" : "/dashboard");
  };

  const signup = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: "admin" | "user"
  ) => {
    setUser({ id: "1", email, role });
    const response = await axios.post(`${BACKEND_URL}/api/v1/admin/signup`, {
      email,
      password,
      firstName,
      lastName,
    });

    localStorage.setItem("token", response.data.token);

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
