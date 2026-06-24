import { Link } from "react-router-dom";
import { Activity } from "lucide-react";

const Navbar = () => {
  const token =
    localStorage.getItem("token");

  const role =
    localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav className="bg-white shadow-md border-b border-blue-100 sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="flex items-center gap-3"
        >

          <div className="bg-blue-600 p-2 rounded-xl">
            <Activity
              className="text-white"
              size={24}
            />
          </div>

          <div>

            <h2 className="text-xl font-bold text-slate-900">
              QueueCare
            </h2>

            <p className="text-xs text-slate-500">
              Smart Hospital Queue Management
            </p>

          </div>

        </Link>

        {!token ? (

          <div className="flex gap-4">

            <Link
              to="/"
              className="text-slate-600"
            >
              Home
            </Link>

            <Link
              to="/login"
              className="px-5 py-2 border border-blue-600 text-blue-600 rounded-xl"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-5 py-2 bg-blue-600 text-white rounded-xl"
            >
              Register
            </Link>

          </div>

        ) : (

          <div className="flex gap-4">

            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl capitalize">
              {role}
            </span>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-5 py-2 rounded-xl"
            >
              Logout
            </button>

          </div>

        )}

      </div>

    </nav>
  );
};

export default Navbar;