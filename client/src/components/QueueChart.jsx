import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const QueueChart = ({
  waiting,
  completed,
  emergency,
}) => {
  const data = [
    {
      name: "Waiting",
      value: waiting,
    },
    {
      name: "Completed",
      value: completed,
    },
    {
      name: "Emergency",
      value: emergency,
    },
  ];

  const COLORS = [
    "#2563eb",
    "#22c55e",
    "#ef4444",
  ];

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-blue-100 p-6">

      <h2 className="text-2xl font-bold mb-6">
        Queue Analytics
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <PieChart>

          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={120}
            dataKey="value"
            label
          >

            {data.map(
              (entry, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[index]
                  }
                />
              )
            )}

          </Pie>

          <Tooltip />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
};

export default QueueChart;