import { Plus } from "lucide-react";

const FloatingActionButton = () => {
  return (
    <button
      className="
      fixed
      bottom-8
      right-8
      bg-blue-600
      hover:bg-blue-700
      text-white
      rounded-full
      p-5
      shadow-xl
      "
    >
      <Plus />
    </button>
  );
};

export default FloatingActionButton;