import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

export function MobileSidebar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleLinkClick = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>EduPlatform</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 mt-4">
          <Link
            to="/"
            className={`text-lg font-semibold hover:text-primary ${
              location.pathname === "/" ? "text-primary" : ""
            }`}
            onClick={handleLinkClick}
          >
            Home
          </Link>
          <Link
            to="/courses"
            className={`text-lg hover:text-primary ${
              location.pathname === "/courses" ? "text-primary" : ""
            }`}
            onClick={handleLinkClick}
          >
            All Courses
          </Link>
          {!user && (
            <>
              <Link
                to="/login"
                className={`text-lg hover:text-primary ${
                  location.pathname === "/login" ? "text-primary" : ""
                }`}
                onClick={handleLinkClick}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`text-lg hover:text-primary ${
                  location.pathname === "/signup" ? "text-primary" : ""
                }`}
                onClick={handleLinkClick}
              >
                Sign Up
              </Link>
            </>
          )}
          {user && (
            <>
              <Link
                to={user.role === "admin" ? "/admin/dashboard" : "/dashboard"}
                className={`text-lg hover:text-primary ${
                  location.pathname.includes("dashboard") ? "text-primary" : ""
                }`}
                onClick={handleLinkClick}
              >
                Dashboard
              </Link>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="justify-start px-0"
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
