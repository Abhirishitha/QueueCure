import { useEffect, useState } from "react";

import {
  Users,
  Clock,
  Activity,
  AlertTriangle,
} from "lucide-react";
import PageLayout from "../components/PageLayout";
import { getSummary } from "../api/queueApi";
import Card from "../components/Card";
import QueueChart from "../components/QueueChart";

const AnalyticsDashboard = () => {
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
  }, []);

  return (
  <PageLayout
  title="Analytics Dashboard"
  subtitle="Queue performance insights"
>

      <h1 className="text-4xl font-bold mb-8">
        Analytics Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <Card>

          <Users
            size={40}
            className="text-blue-600"
          />

          <h3 className="mt-4 text-slate-500">
            Waiting
          </h3>

          <p className="text-5xl font-bold">
            {summary?.waitingCount || 0}
          </p>

        </Card>

        <Card>

          <Activity
            size={40}
            className="text-green-600"
          />

          <h3 className="mt-4 text-slate-500">
            Completed
          </h3>

          <p className="text-5xl font-bold">
            {summary?.completedCount || 0}
          </p>

        </Card>

        <Card>

          <AlertTriangle
            size={40}
            className="text-red-600"
          />

          <h3 className="mt-4 text-slate-500">
            Emergency
          </h3>

          <p className="text-5xl font-bold">
            {summary?.emergencyCount || 0}
          </p>

        </Card>

        <Card>

          <Clock
            size={40}
            className="text-orange-500"
          />

          <h3 className="mt-4 text-slate-500">
            Avg Time
          </h3>

          <p className="text-5xl font-bold">
            {summary?.avgTime || 8}m
          </p>

        </Card>

      </div>

      <QueueChart
        waiting={
          summary?.waitingCount || 0
        }
        completed={
          summary?.completedCount || 0
        }
        emergency={
          summary?.emergencyCount || 0
        }
      />

    </PageLayout>
  );
};

export default AnalyticsDashboard;