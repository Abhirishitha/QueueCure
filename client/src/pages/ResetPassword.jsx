import { useState } from "react";
import { useParams } from "react-router-dom";
import { resetPassword } from "../api/authApi";
import toast from "react-hot-toast";

const ResetPassword = () => {

  const { token } =
    useParams();

  const [password,
    setPassword] =
    useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const data =
          await resetPassword(
            token,
            password
          );

        toast.success(
          data.message
        );

      } catch {

        toast.error(
          "Reset Failed"
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
          Reset Password
        </h1>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-xl"
        />

        <button className="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl">
          Reset Password
        </button>

      </form>

    </div>
  );
};

export default ResetPassword;