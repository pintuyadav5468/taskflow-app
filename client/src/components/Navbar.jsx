import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, CheckSquare, User, LogOut } from "lucide-react";

function Navbar({ user, onLogout }) {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "bg-blue-700" : "hover:bg-blue-700";
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="text-xl font-bold">
              TaskFlow
            </Link>

            <div className="hidden md:flex space-x-1">
              <Link
                to="/dashboard"
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${isActive("/dashboard")}`}
              >
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </Link>

              <Link
                to="/tasks"
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${isActive("/tasks")}`}
              >
                <CheckSquare className="h-5 w-5" />
                Tasks
              </Link>

              <Link
                to="/profile"
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${isActive("/profile")}`}
              >
                <User className="h-5 w-5" />
                Profile
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-8 w-8 rounded-full border-2 border-white"
              />
              <span className="font-medium">{user.name}</span>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-700 hover:bg-blue-800 transition"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

