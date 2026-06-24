import Navbar from "./Navbar";

const PageLayout = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-8">

        <div className="mb-10">

          <h1 className="text-4xl font-bold text-slate-900">
            {title}
          </h1>

          <p className="text-slate-500 mt-2">
            {subtitle}
          </p>

        </div>

        {children}

      </div>

    </div>
  );
};

export default PageLayout;