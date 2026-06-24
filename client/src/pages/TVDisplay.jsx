import { useEffect, useState } from "react";
import { getSummary, getQueue } from "../api/queueApi";
import socket from "../socket/socketClient";

const TVDisplay = () => {
  const [summary, setSummary] = useState(null);
  const [queue, setQueue] = useState([]);

  const fetchData = async () => {
    try {
      const summaryData = await getSummary();
      const queueData = await getQueue();

      setSummary(summaryData);
      setQueue(queueData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();

    socket.on("queueUpdated", () => {
      fetchData();
    });

    return () => {
      socket.off("queueUpdated");
    };
  }, []);

  const waitingPatients = queue.filter(
    (patient) => patient.status === "waiting"
  );

  const nextTokens = waitingPatients.slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-600 text-white">

      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* Header */}

        <div className="text-center mb-12">

          <h1 className="text-7xl font-extrabold">
            QueueCare
          </h1>

          <p className="text-2xl mt-4 opacity-90">
            Smart Digital Queue Management
          </p>

        </div>

        {/* Current Token */}

        <div className="bg-white text-blue-900 rounded-3xl p-10 shadow-2xl text-center">

          <h2 className="text-3xl font-semibold">
            NOW SERVING
          </h2>

          <p className="text-9xl font-black mt-6">
            {summary?.currentToken || "-"}
          </p>

          <p className="text-3xl mt-4">
            {summary?.currentPatient ||
              "Waiting For Patient"}
          </p>

        </div>

        {/* Next Queue */}

        <div className="grid md:grid-cols-2 gap-8 mt-10">

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8">

            <h3 className="text-3xl font-bold mb-6">
              Upcoming Tokens
            </h3>

            <div className="space-y-4">

              {nextTokens.length > 0 ? (
                nextTokens.map((patient) => (
                  <div
                    key={patient._id}
                    className="flex justify-between bg-white/10 rounded-xl px-5 py-4"
                  >
                    <span className="text-2xl font-bold">
                      #{patient.tokenNumber}
                    </span>

                    <span className="text-xl">
                      {patient.patientName}
                    </span>
                  </div>
                ))
              ) : (
                <p>No waiting patients</p>
              )}

            </div>

          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8">

            <h3 className="text-3xl font-bold mb-6">
              Queue Statistics
            </h3>

            <div className="space-y-6">

              <div>
                <p className="text-xl opacity-80">
                  Waiting Patients
                </p>

                <p className="text-6xl font-bold">
                  {summary?.waitingCount || 0}
                </p>
              </div>

              <div>
                <p className="text-xl opacity-80">
                  Completed Today
                </p>

                <p className="text-6xl font-bold">
                  {summary?.completedCount || 0}
                </p>
              </div>

              <div>
                <p className="text-xl opacity-80">
                  Average Wait Time
                </p>

                <p className="text-6xl font-bold">
                  8 mins
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default TVDisplay;