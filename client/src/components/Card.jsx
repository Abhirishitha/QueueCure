const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`
        bg-white
        rounded-3xl
        shadow-lg
        border
        border-blue-100
        p-6
        hover:shadow-xl
        transition-all
        duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;