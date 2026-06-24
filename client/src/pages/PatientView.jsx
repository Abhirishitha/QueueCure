import { Clock3, Users, Bell } from "lucide-react";

const PatientView = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-8">

      {/* Header */}

      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-blue-600">
          QueueCare
        </h1>

        <p className="text-slate-500 mt-2">
          Live Patient Queue Tracking
        </p>
      </div>

      {/* NOW SERVING */}

      <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-4xl mx-auto">

        <p className="text-slate-500 text-xl mb-4">
          NOW SERVING
        </p>

        <h2 className="text-[120px] font-extrabold text-blue-600 leading-none">
          105
        </h2>

        <div className="mt-4 inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
          <Bell size={18} />
          Consultation In Progress
        </div>

      </div>

      {/* Patient Status Cards */}

      <div className="grid md:grid-cols-3 gap-6 mt-10 max-w-6xl mx-auto">

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <Users className="mx-auto text-blue-600 mb-3" size={36} />
          <p className="text-slate-500">Your Token</p>
          <h3 className="text-5xl font-bold mt-2">
            108
          </h3>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <Users className="mx-auto text-orange-500 mb-3" size={36} />
          <p className="text-slate-500">Patients Ahead</p>
          <h3 className="text-5xl font-bold mt-2">
            3
          </h3>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <Clock3 className="mx-auto text-green-600 mb-3" size={36} />
          <p className="text-slate-500">Estimated Wait</p>
          <h3 className="text-5xl font-bold mt-2">
            24m
          </h3>
        </div>

      </div>

      {/* Queue Progress */}

      <div className="bg-white rounded-3xl shadow-lg p-8 mt-10 max-w-6xl mx-auto">

        <h3 className="text-xl font-bold mb-6">
          Queue Progress
        </h3>

        <div className="flex justify-between mb-4">
          <span className="font-semibold">105</span>
          <span className="font-semibold">108</span>
        </div>

        <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full w-3/4 bg-blue-600 rounded-full"></div>
        </div>

        <div className="flex justify-between mt-4 text-slate-500">
          <span>Current Token</span>
          <span>Your Token</span>
        </div>

      </div>

      {/* Notification Card */}

      <div className="max-w-6xl mx-auto mt-10">

        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">

          <div className="flex items-center gap-3">
            <Bell className="text-yellow-600" />
            <div>
              <h4 className="font-semibold">
                Turn Approaching
              </h4>

              <p className="text-slate-600">
                Only 3 patients ahead. Please stay near the clinic.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default PatientView;