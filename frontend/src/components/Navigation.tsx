import { Button } from "../components/ui/button";
import { useAuth } from "../contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { MobileSidebar } from "./MobileSidebar";

const Navigation = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-2">
            <MobileSidebar />
            <Link to="/" className="text-xl font-bold text-primary">
              EduPlatform
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/courses"
              className={`text-gray-700 hover:text-primary ${
                location.pathname === "/courses" ? "text-primary" : ""
              }`}
            >
              All Courses
            </Link>
            {!user && (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
            {user && (
              <>
                <Link
                  to={user.role === "admin" ? "/admin/dashboard" : "/dashboard"}
                  className={`text-gray-700 hover:text-primary ${
                    location.pathname.includes("dashboard")
                      ? "text-primary"
                      : ""
                  }`}
                >
                  Dashboard
                </Link>
                <Button variant="ghost" onClick={logout}>
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
