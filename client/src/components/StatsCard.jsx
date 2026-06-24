import { motion } from "framer-motion";

const StatsCard = ({
  title,
  value,
  icon,
}) => {
  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100"
    >
      <div className="mb-4">
        {icon}
      </div>

      <p className="text-slate-500">
        {title}
      </p>

      <h3 className="text-4xl font-bold mt-2 text-slate-900">
        {value}
      </h3>
    </motion.div>
  );
};

export default StatsCard;