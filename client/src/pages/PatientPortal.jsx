import { useEffect, useState } from "react";
import { getSummary } from "../api/queueApi";
import TokenQRCode from "../components/TokenQRCode";
import DownloadToken from "../components/DownloadToken";
import PageLayout from "../components/PageLayout";
import {
  User,
  Clock,
  Activity,
} from "lucide-react";

const PatientPortal = () => {
  const [summary, setSummary] =
    useState(null);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const data =
        await getSummary();

      setSummary(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
  <PageLayout
    title="Patient Portal"
    subtitle="Track your queue in real time"
  >

      {/* Header */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Patient Portal
        </h1>

        <p className="text-slate-500 mt-2">
          Track your queue status in real-time
        </p>
      </div>

      {/* Main Grid */}

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Queue Status */}

        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-8">
            Current Queue Status
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

<div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-3xl p-8 shadow-lg">
              <Activity
                size={40}
                className="text-blue-600 mb-4"
              />

              <p className="text-slate-500">
                Current Token
              </p>

              <p className="text-6xl font-bold text-blue-600">
                {summary?.currentToken || "-"}
              </p>

            </div>

<div className="bg-white border border-blue-100 rounded-3xl p-8 shadow-lg">
              <User
                size={40}
                className="text-green-600 mb-4"
              />

              <p className="text-blue-100">
                Serving Patient
              </p>

              <p className="text-2xl font-bold">
                {summary?.currentPatient ||
                  "None"}
              </p>

            </div>

          </div>

          <div className="mt-8 bg-orange-50 rounded-2xl p-6">

            <Clock
              size={40}
              className="text-orange-600 mb-4"
            />

            <p className="text-slate-500">
              Average Waiting Time
            </p>

            <p className="text-4xl font-bold">
              {summary?.avgTime || 8}
              {" "}mins
            </p>

          </div>

        </div>

        {/* Right Panel */}

        <div className="space-y-6">

          <TokenQRCode
            token={
              summary?.currentToken || 106
            }
          />

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-xl font-bold mb-4">
              Token Receipt
            </h2>

            <DownloadToken />

          </div>

        </div>

      </div>

</PageLayout>
);
};

export default PatientPortal;