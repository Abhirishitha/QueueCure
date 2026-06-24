import { BrowserRouter, Routes, Route } from "react-router-dom";
import DoctorDashboard from "../pages/DoctorDashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import ProtectedRoute from "../components/ProtectedRoute";
import ReceptionistDashboard from "../pages/ReceptionistDashboard";
import PatientView from "../pages/PatientView";
import WaitingRoom from "../pages/WaitingRoom";
import TVDisplay from "../pages/TVDisplay";
import AdminDashboard from "../pages/AdminDashboard";
import PatientPortal from "../pages/PatientPortal";
import AnalyticsDashboard from "../pages/AnalyticsDashboard";
import AppointmentBooking from "../pages/AppointmentBooking";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />
<Route
  path="/login"
  element={<Login />}
/>

<Route
  path="/register"
  element={<Register />}
/><Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

<Route
  path="/reset-password/:token"
  element={<ResetPassword />}
/>
       <Route
  path="/receptionist"
  element={
    <ProtectedRoute
      allowedRole="receptionist"
    >
      <ReceptionistDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/patient"
  element={
    <ProtectedRoute
      allowedRole="patient"
    >
      <PatientPortal />
    </ProtectedRoute>
  }
/><Route
  path="/admin"
  element={
    <ProtectedRoute
      allowedRole="admin"
    >
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
        <Route
          path="/patient"
          element={<PatientView />}
        />

        <Route
          path="/waiting-room"
          element={<WaitingRoom />}
        />

     <Route
  path="/doctor"
  element={
    <ProtectedRoute
      allowedRole="doctor"
    >
      <DoctorDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/display"
  element={<TVDisplay />}
/>
<Route
  path="/analytics"
  element={
    <ProtectedRoute
      allowedRole="receptionist"
    >
      <AnalyticsDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/appointment"
  element={<AppointmentBooking />}
/>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;