import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ui/use-toast";
import axios from "axios";

interface User {
  id: string;
  email: string;
  role: "admin" | "user";
  enrolledCourses: string[];
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
  enrollInCourse: (courseId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const login = async (
    email: string,
    password: string,
    role: "admin" | "user"
  ) => {
    if (role === "admin") {
      setUser({ id: "1", email, role, enrolledCourses: [] });
      const response = await axios.post(
        "https://tech-courses-be.onrender.com/api/v1/admin/signin",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
    } else {
      setUser({ id: "1", email, role, enrolledCourses: [] });
      const response = await axios.post(
        "https://tech-courses-be.onrender.com/api/v1/user/signin",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
    }

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
    if (role === "admin") {
      setUser({ id: "1", email, role, enrolledCourses: [] });
      const response = await axios.post(
        "https://tech-courses-be.onrender.com/api/v1/admin/signup",
        {
          email,
          password,
          firstName,
          lastName,
        }
      );

      localStorage.setItem("token", response.data.token);
    } else {
      setUser({ id: "1", email, role, enrolledCourses: [] });
      const response = await axios.post(
        "https://tech-courses-be.onrender.com/api/v1/user/signup",
        {
          email,
          password,
          firstName,
          lastName,
        }
      );
      localStorage.setItem("token", response.data.token);
    }

    toast({
      title: "Account created successfully",
      description: "Welcome to our platform!",
    });
    navigate(role === "admin" ? "/admin/dashboard" : "/dashboard");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    toast({
      title: "Logged out successfully",
      description: "Come back soon!",
    });
    navigate("/");
  };

  const enrollInCourse = async (courseId: string) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      enrolledCourses: [...user.enrolledCourses, courseId],
    };

    setUser(updatedUser);

    await axios.post(
      "https://tech-courses-be.onrender.com/api/v1/course/purchase",
      {
        courseId: courseId,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    toast({
      title: "Enrolled Successfully",
      description: "You have been enrolled in the course!",
    });

    navigate("/dashboard");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, enrollInCourse }}
    >
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
