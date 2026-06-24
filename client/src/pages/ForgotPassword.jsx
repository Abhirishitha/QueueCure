import { useState } from "react";
import { forgotPassword } from "../api/authApi";
import toast from "react-hot-toast";

const ForgotPassword = () => {

  const [email, setEmail] =
    useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const data =
          await forgotPassword(
            email
          );

        toast.success(
          data.message
        );

      } catch {

        toast.error(
          "Failed"
        );

      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={
          handleSubmit
        }
        className="bg-white p-8 rounded-3xl shadow w-[400px]"
      >

        <h1 className="text-3xl font-bold mb-5">
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-xl"
        />

        <button className="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl">
          Send Reset Link
        </button>

      </form>

    </div>
  );
};

export default ForgotPassword;