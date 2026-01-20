import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {user && <Navbar user={user} onLogout={logout} />}

        <Routes>
          <Route
            path="/login"
            element={
              user ? <Navigate to="/dashboard" /> : <Login onLogin={login} />
            }
          />
          <Route
            path="/register"
            element={
              user ? <Navigate to="/dashboard" /> : <Register onLogin={login} />
            }
          />
          <Route
            path="/dashboard"
            element={
              user ? <Dashboard user={user} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/tasks"
            element={user ? <Tasks user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={
              user ? (
                <Profile user={user} setUser={setUser} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/"
            element={<Navigate to={user ? "/dashboard" : "/login"} />}
          />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
