import { useEffect, useState } from "react";
import { getSummary } from "../api/queueApi";
import socket from "../socket/socketClient";

const WaitingRoom = () => {
  const [summary, setSummary] =
    useState(null);

  const patientToken = 106;

  const fetchData = async () => {
    try {
      const data =
        await getSummary();

      setSummary(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();

    socket.on(
      "queueUpdated",
      () => {
        fetchData();
      }
    );

    return () => {
      socket.off(
        "queueUpdated"
      );
    };
  }, []);

  const patientsAhead =
    summary?.currentToken
      ? Math.max(
          patientToken -
            summary.currentToken -
            1,
          0
        )
      : 0;

  const estimatedWait =
    patientsAhead * 8;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center p-6">

      <div className="bg-white max-w-5xl w-full rounded-3xl shadow-2xl p-10">

        <h1 className="text-center text-5xl font-bold text-blue-600 mb-10">
          QueueCare
        </h1>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-blue-50 rounded-3xl p-8 text-center">

            <h2 className="text-lg text-gray-500">
              Now Serving
            </h2>

            <p className="text-8xl font-bold text-blue-600 mt-4">
              {summary?.currentToken || "-"}
            </p>

            <p className="mt-3 text-gray-500">
              {summary?.currentPatient ||
                "Waiting"}
            </p>

          </div>

          <div className="bg-green-50 rounded-3xl p-8 text-center">

            <h2 className="text-lg text-gray-500">
              Your Token
            </h2>

            <p className="text-8xl font-bold text-green-600 mt-4">
              {patientToken}
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">

          <div className="bg-orange-50 rounded-2xl p-6 text-center">

            <h3 className="text-gray-500">
              Patients Ahead
            </h3>

            <p className="text-5xl font-bold text-orange-500 mt-3">
              {patientsAhead}
            </p>

          </div>

          <div className="bg-purple-50 rounded-2xl p-6 text-center">

            <h3 className="text-gray-500">
              Estimated Wait
            </h3>

            <p className="text-5xl font-bold text-purple-600 mt-3">
              {estimatedWait}m
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default WaitingRoom;