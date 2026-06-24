import { useEffect, useState } from "react";
import {
  Users,
  UserCheck,
  AlertTriangle,
  Activity,
} from "lucide-react";
import PageLayout from "../components/PageLayout";
import { getSummary } from "../api/queueApi";
import Card from "../components/Card";

const AdminDashboard = () => {
  const [summary, setSummary] =
    useState(null);

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

    const interval =
      setInterval(fetchData, 5000);

    return () =>
      clearInterval(interval);
  }, []);

  return (
    <PageLayout
      title="Admin Dashboard"
      subtitle="Manage and monitor the queue system"
    >

      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6 mb-8">

<Card>
          <Users
            size={40}
            className="text-blue-600"
          />

          <h3 className="mt-4 text-slate-500">
            Waiting Patients
          </h3>

          <p className="text-5xl font-bold">
            {summary?.waitingCount || 0}
          </p>

        </Card>

        <div className="bg-white p-6 rounded-3xl shadow">

          <UserCheck
            size={40}
            className="text-green-600"
          />

          <h3 className="mt-4 text-slate-500">
            Completed
          </h3>

          <p className="text-5xl font-bold">
            {summary?.completedCount || 0}
          </p>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow">

          <AlertTriangle
            size={40}
            className="text-red-600"
          />

          <h3 className="mt-4 text-slate-500">
            Emergency Cases
          </h3>

          <p className="text-5xl font-bold">
            {summary?.emergencyCount || 0}
          </p>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow">

          <Activity
            size={40}
            className="text-purple-600"
          />

          <h3 className="mt-4 text-slate-500">
            Avg Consultation
          </h3>

          <p className="text-5xl font-bold">
            {summary?.avgTime || 8}
            m
          </p>

        </div>

      </div>

      <div className="bg-white rounded-3xl shadow p-8">

        <h2 className="text-2xl font-bold mb-6">
          Live Clinic Overview
        </h2>

        <div className="space-y-4">

          <div className="flex justify-between">
            <span>
              Current Token
            </span>

            <span className="font-bold">
              {summary?.currentToken || "-"}
            </span>
          </div>

          <div className="flex justify-between">
            <span>
              Current Patient
            </span>

            <span className="font-bold">
              {summary?.currentPatient ||
                "None"}
            </span>
          </div>

          <div className="flex justify-between">
            <span>
              System Status
            </span>

            <span className="text-green-600 font-bold">
              Live
            </span>
          </div>

        </div>

      </div>

    </PageLayout>
  );
};

export default AdminDashboard;