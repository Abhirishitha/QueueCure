import { useState, useEffect } from "react";
import {
  Users,
  Clock3,
  Activity,
  Phone,
} from "lucide-react";
import PageLayout from "../components/PageLayout";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import socket from "../socket/socketClient";
import {
  getSummary,
  getQueue,
  callNext,
  addPatient,
} from "../api/queueApi";
import Card from "../components/Card";
const ReceptionistDashboard = () => {
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [doctor, setDoctor] = useState("");

  const [summary, setSummary] = useState(null);
  const [queue, setQueue] = useState([]);

  const fetchSummary = async () => {
    try {
      const data = await getSummary();
      setSummary(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchQueue = async () => {
    try {
      const data = await getQueue();
      setQueue(data);
    } catch (error) {
      console.log(error);
    }
  };

useEffect(() => {
  fetchSummary();
  fetchQueue();

  socket.on(
    "queueUpdated",
    () => {
      fetchSummary();
      fetchQueue();
    }
  );

  return () => {
    socket.off(
      "queueUpdated"
    );
  };
}, []);

  const handleGenerateToken = async () => {
    try {
      if (
        !patientName ||
        !phone ||
        !age ||
        !doctor
      ) {
        toast.error("Please fill all fields");
        return;
      }

      const patient = await addPatient({
        patientName,
        phone,
        age,
        doctor,
      });

      toast.success(
        `Token ${patient.tokenNumber} generated`
      );

      setPatientName("");
      setPhone("");
      setAge("");
      setDoctor("");

      fetchSummary();
      fetchQueue();
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to generate token"
      );
    }
  };

  const handleCallNext = async () => {
    try {
      const response =
        await callNext();

      toast.success(
        `Token ${response.patient.tokenNumber} called`
      );

      fetchSummary();
      fetchQueue();
    } catch (error) {
      toast.error(
        "No patients in queue"
      );
    }
  };

return (
  <PageLayout
    title="Receptionist Dashboard"
    subtitle="Manage patients and hospital queue"
  >

    {/* Stats */}

    <div className="grid md:grid-cols-4 gap-6 mb-8">

   <Card className="bg-white rounded-3xl shadow-lg border border-blue-100 hover:shadow-xl transition">
        <Activity className="text-blue-600 mb-4" />
        <h3 className="text-slate-500">
          Current Token
        </h3>
        <p className="text-4xl font-bold">
          {summary?.currentToken || "-"}
        </p>
      </Card>

      <Card className="bg-white rounded-3xl shadow-lg border border-blue-100 hover:shadow-xl transition">
        <Users className="text-blue-600 mb-4" />
        <h3 className="text-slate-500">
          Patients Waiting
        </h3>
        <p className="text-4xl font-bold">
          {summary?.waitingCount || 0}
        </p>
      </Card>

      <Card className="bg-white rounded-3xl shadow-lg border border-blue-100 hover:shadow-xl transition">
        <Clock3 className="text-blue-600 mb-4" />
        <h3 className="text-slate-500">
          Avg Time
        </h3>
        <p className="text-4xl font-bold">
          8m
        </p>
      </Card>

      <Card className="bg-white rounded-3xl shadow-lg border border-blue-100 hover:shadow-xl transition">
        <Phone className="text-blue-600 mb-4" />
        <h3 className="text-slate-500">
          Completed
        </h3>
        <p className="text-4xl font-bold">
          {summary?.completedCount || 0}
        </p>
      </Card>

    </div>

    {/* Main Grid */}

    <div className="grid lg:grid-cols-3 gap-8">

      {/* Register Patient */}

      <Card className="bg-white rounded-3xl shadow-lg border border-blue-100 hover:shadow-xl transition">

        <h2 className="text-xl font-bold mb-6">
          Register Patient
        </h2>

        <div className="space-y-4">

          <input
            value={patientName}
            onChange={(e) =>
              setPatientName(
                e.target.value
              )
            }
            placeholder="Patient Name"
            className="w-full border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl p-3 outline-none"
          />

          <input
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value
              )
            }
            placeholder="Phone Number"
            className="w-full border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl p-3 outline-none"
          />

          <input
            value={age}
            onChange={(e) =>
              setAge(
                e.target.value
              )
            }
            placeholder="Age"
            className="w-full border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl p-3 outline-none"
          />

          <select
            value={doctor}
            onChange={(e) =>
              setDoctor(
                e.target.value
              )
            }
            className="w-full border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl p-3 outline-none"
          >
            <option value="">
              Select Doctor
            </option>

            <option value="Dr. Sharma">
              Dr. Sharma
            </option>

            <option value="Dr. Priya">
              Dr. Priya
            </option>
          </select>

          <button
            onClick={
              handleGenerateToken
            }
          >className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-md transition"
            Generate Token
          </button>

        </div>

      </Card>

      {/* Queue */}

      <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-blue-100 p-6">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-xl font-bold">
            Live Queue
          </h2>

          <button
            onClick={
              handleCallNext
            }
className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold shadow-md transition"          >
            Call Next Patient
          </button>

        </div>

        <table className="w-full">

          <thead>
<tr className="border-b bg-slate-50 text-left">              <th className="py-3">
                Token
              </th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {queue.map((patient) => (
              <tr
                key={patient._id}
                className="border-b"
              >
                <td className="py-4">
                  {patient.tokenNumber}
                </td>

                <td>
                  {patient.patientName}
                </td>

                <td>
                  {patient.doctor}
                </td>

                <td>

                  <span
                    className={`
                    px-3 py-1 rounded-full text-sm
                    ${
                      patient.status ===
                      "serving"
                        ? "bg-blue-100 text-blue-700"
                        : patient.status ===
                          "completed"
                        ? "bg-slate-200 text-slate-700"
                        : "bg-blue-50 text-blue-600"
                    }
                    `}
                  >
                    {patient.status}
                  </span>

                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>

  </PageLayout>
);
};

export default ReceptionistDashboard;