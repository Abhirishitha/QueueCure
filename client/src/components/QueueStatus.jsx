const QueueStatus = ({
  token,
  status,
}) => {
  return (
    <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">

      <div>
        <h4 className="font-semibold">
          Token #{token}
        </h4>
      </div>

      <span
        className={`
        px-3 py-1 rounded-full text-sm
        ${
          status === "Serving"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }
        `}
      >
        {status}
      </span>

    </div>
  );
};

export default QueueStatus;