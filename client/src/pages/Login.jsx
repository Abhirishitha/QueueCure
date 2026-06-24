import { useState } from "react";
import { loginUser } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data =
        await loginUser({
          email,
          password,
        });

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "role",
        data.role
      );

      toast.success(
        "Login Successful"
      );

      if (
        data.role ===
        "receptionist"
      ) {
        navigate(
          "/receptionist"
        );
      } else if (
        data.role ===
        "doctor"
      ) {
        navigate("/doctor");
      } else {
        navigate("/patient");
      }
    } catch {
      toast.error(
        "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* Left */}

      <div className="bg-blue-600 text-white flex flex-col justify-center px-16">

        <h1 className="text-6xl font-bold">
          QueueCare
        </h1>

        <p className="mt-6 text-xl">
          Smart Hospital Queue
          Management System
        </p>

        <p className="mt-4 text-blue-100">
          Manage patients, reduce
          waiting time and improve
          healthcare experience.
        </p>

      </div>

      {/* Right */}

      <div className="flex items-center justify-center bg-slate-50">

        <div className="bg-white p-10 rounded-3xl shadow-xl w-[420px]">

          <h2 className="text-3xl font-bold mb-6">
            Login
          </h2>

          <form
            onSubmit={
              handleLogin
            }
            className="space-y-4"
          >

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full border border-slate-300 p-4 rounded-xl"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full border border-slate-300 p-4 rounded-xl"
            />

            <div className="text-right">

              <Link
                to="/forgot-password"
                className="text-blue-600"
              >
                Forgot Password?
              </Link>

            </div>

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl"
            >
              Login
            </button>

          </form>

          <p className="text-center mt-6">

            Don't have an account?

            <Link
              to="/register"
              className="text-blue-600 ml-2"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;