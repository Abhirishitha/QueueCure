import { useEffect, useState } from "react";
import {
  Stethoscope,
  User,
  Clock,
  CheckCircle,
} from "lucide-react";
import PageLayout from "../components/PageLayout";
import toast from "react-hot-toast";
import Card from "../components/Card";
import {
  getSummary,
  getQueue,
  completeConsultation,
} from "../api/queueApi";

import socket from "../socket/socketClient";

const DoctorDashboard = () => {
  const [summary, setSummary] =
    useState(null);

  const [queue, setQueue] =
    useState([]);

  const fetchData = async () => {
    try {
      const summaryData =
        await getSummary();

      const queueData =
        await getQueue();

      setSummary(summaryData);
      setQueue(queueData);
    } catch (err) {
      console.log(err);
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

  const handleComplete =
    async () => {
      try {
        await completeConsultation();

        toast.success(
          "Consultation Completed"
        );

        fetchData();
      } catch (error) {
        toast.error(
          "No Active Consultation"
        );
      }
    };

  const currentPatient =
    queue.find(
      (patient) =>
        patient.status ===
        "serving"
    );

    return (
  <PageLayout
    title="Doctor Dashboard"
    subtitle="Monitor consultations and queue"
  >
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-slate-900 mb-8">
          Doctor Dashboard
        </h1>

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <Card>

            <Stethoscope
              className="text-blue-600"
              size={40}
            />

            <h3 className="mt-4 text-slate-500">
              Current Token
            </h3>

            <p className="text-5xl font-bold mt-2">
              {summary?.currentToken ||
                "-"}
            </p>

          </Card>

          <Card>

            <User
              className="text-green-600"
              size={40}
            />

            <h3 className="mt-4 text-slate-500">
              Patient Name
            </h3>

            <p className="text-2xl font-bold mt-2">
              {summary?.currentPatient ||
                "No Patient"}
            </p>

          </Card>

          <Card>

            <Clock
              className="text-orange-500"
              size={40}
            />

            <h3 className="mt-4 text-slate-500">
              Waiting Patients
            </h3>

            <p className="text-5xl font-bold mt-2">
              {summary?.waitingCount ||
                0}
            </p>

          </Card>

        </div>

        {/* Current Consultation */}

        <Card>

          <h2 className="text-2xl font-bold mb-6">
            Current Consultation
          </h2>

          {currentPatient ? (
            <div>

              <div className="grid md:grid-cols-2 gap-6">

                <div>
                  <p className="text-slate-500">
                    Token Number
                  </p>

                  <h3 className="text-3xl font-bold">
                    {
                      currentPatient.tokenNumber
                    }
                  </h3>
                </div>

                <div>
                  <p className="text-slate-500">
                    Patient Name
                  </p>

                  <h3 className="text-3xl font-bold">
                    {
                      currentPatient.patientName
                    }
                  </h3>
                </div>

                <div>
                  <p className="text-slate-500">
                    Doctor
                  </p>

                  <h3 className="text-xl font-semibold">
                    {
                      currentPatient.doctor
                    }
                  </h3>
                </div>

                <div>
                  <p className="text-slate-500">
                    Status
                  </p>

                  <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                    Serving
                  </span>
                </div>

              </div>

              <button
                onClick={
                  handleComplete
                }
                className="mt-8 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
              >
                <CheckCircle
                  size={20}
                />
                Complete Consultation
              </button>

            </div>
          ) : (
            <div className="text-center py-10">

              <h3 className="text-2xl font-bold text-slate-600">
                No Active Consultation
              </h3>

              <p className="text-slate-400 mt-2">
                Waiting for receptionist
                to call next patient
              </p>

            </div>
          )}

        </Card>

      </div>

  </PageLayout>
);
};

export default DoctorDashboard;