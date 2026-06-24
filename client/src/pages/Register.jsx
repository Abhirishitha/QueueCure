import { useState } from "react";
import { registerUser } from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "patient",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await registerUser(
          formData
        );

        toast.success(
          "Registration Successful"
        );

        navigate(
          "/login"
        );
      } catch {
        toast.error(
          "Registration Failed"
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
          Join QueueCare and
          experience smarter
          patient management.
        </p>

      </div>

      {/* Right */}

      <div className="flex items-center justify-center bg-slate-50">

        <div className="bg-white p-10 rounded-3xl shadow-xl w-[450px]">

          <h2 className="text-3xl font-bold mb-6">
            Register
          </h2>

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-4"
          >

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={
                handleChange
              }
              className="w-full border p-4 rounded-xl"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={
                handleChange
              }
              className="w-full border p-4 rounded-xl"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={
                handleChange
              }
              className="w-full border p-4 rounded-xl"
            />

            <select
              name="role"
              onChange={
                handleChange
              }
              className="w-full border p-4 rounded-xl"
            >
              <option value="patient">
                Patient
              </option>

              <option value="doctor">
                Doctor
              </option>

              <option value="receptionist">
                Receptionist
              </option>

            </select>

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl"
            >
              Register
            </button>

          </form>

          <p className="text-center mt-6">

            Already have an account?

            <Link
              to="/login"
              className="text-blue-600 ml-2"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Register;