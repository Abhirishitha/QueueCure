import { Link } from "react-router-dom";

const Sidebar = () => {
  const role =
    localStorage.getItem("role");

  return (
    <div className="w-64 bg-white shadow-lg border-r border-blue-100 min-h-screen p-6">

      <h2 className="text-2xl font-bold text-blue-600 mb-8">
        QueueCare
      </h2>

      <div className="space-y-3">

        {role === "admin" && (
          <>
            <Link
              to="/admin"
              className="block p-3 rounded-xl hover:bg-blue-50"
            >
              Dashboard
            </Link>

            <Link
              to="/analytics"
              className="block p-3 rounded-xl hover:bg-blue-50"
            >
              Analytics
            </Link>
          </>
        )}

        {role === "doctor" && (
          <Link
            to="/doctor"
            className="block p-3 rounded-xl hover:bg-blue-50"
          >
            Doctor Dashboard
          </Link>
        )}

        {role === "patient" && (
          <>
            <Link
              to="/patient"
              className="block p-3 rounded-xl hover:bg-blue-50"
            >
              Patient Portal
            </Link>

            <Link
              to="/appointment"
              className="block p-3 rounded-xl hover:bg-blue-50"
            >
              Appointment
            </Link>
          </>
        )}

        {role === "receptionist" && (
          <Link
            to="/receptionist"
            className="block p-3 rounded-xl hover:bg-blue-50"
          >
            Receptionist Dashboard
          </Link>
        )}

      </div>

    </div>
  );
};

export default Sidebar;