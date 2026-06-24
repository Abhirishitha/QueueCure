import { Link } from "react-router-dom";
import {
  Activity,
  Clock3,
  Bell,
  Users,
} from "lucide-react";

import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      {/* Hero */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div>

          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium">
  AI Powered Healthcare Platform
</div>

<h1 className="text-7xl font-extrabold text-slate-900 mt-6 leading-tight">
  Smart Hospital
  <span className="text-blue-600"> Queue </span>
  Management
</h1>
            <p className="text-lg text-slate-600 mt-6">
              Reduce waiting time, improve patient
              experience and streamline hospital
              operations using real-time queue
              tracking and smart token management.
            </p>

            <div className="flex gap-4 mt-8">

              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
              >
                Register
              </Link>

              <Link
                to="/login"
                className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl transition"
              >
                Login
              </Link>

            </div>

          </div>

          <div>

            <img
              src="https://images.unsplash.com/photo-1584515933487-779824d29309"
              alt="Hospital"
              className="rounded-3xl shadow-xl w-full h-[500px] object-cover"
            />

          </div>

        </div>

      </section>

      {/* About */}

      <section
        id="about"
        className="max-w-7xl mx-auto px-6 py-20"
      >

        <div className="bg-white rounded-3xl shadow-lg border border-blue-100 p-10">

          <h2 className="text-4xl font-bold text-center mb-6">
            About QueueCare
          </h2>

          <p className="text-center text-lg text-slate-600 max-w-4xl mx-auto">
            QueueCare is an AI-powered hospital
            queue management platform that helps
            hospitals reduce patient waiting time,
            improve service quality and manage
            appointments efficiently.
          </p>

        </div>

      </section>

      {/* Features */}

      <section
        id="features"
        className="max-w-7xl mx-auto px-6 pb-20"
      >

        <h2 className="text-4xl font-bold text-center mb-12">
          Key Features
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-white rounded-3xl shadow-lg border border-blue-100 p-6">

            <Activity
              size={40}
              className="text-blue-600 mb-4"
            />

            <h3 className="text-xl font-bold mb-3">
              Live Queue Tracking
            </h3>

            <p className="text-slate-600">
              Real-time queue updates.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-blue-100 p-6">

            <Clock3
              size={40}
              className="text-blue-600 mb-4"
            />

            <h3 className="text-xl font-bold mb-3">
              Smart Wait Time
            </h3>

            <p className="text-slate-600">
              Accurate waiting estimation.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-blue-100 p-6">

            <Bell
              size={40}
              className="text-blue-600 mb-4"
            />

            <h3 className="text-xl font-bold mb-3">
              Instant Alerts
            </h3>

            <p className="text-slate-600">
              Notify patients instantly.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-blue-100 p-6">

            <Users
              size={40}
              className="text-blue-600 mb-4"
            />

            <h3 className="text-xl font-bold mb-3">
              Multi Role Access
            </h3>

            <p className="text-slate-600">
              Doctor, Patient and Receptionist.
            </p>

          </div>

        </div>

      </section>

      {/* Contact */}

      <section
        id="contact"
        className="bg-blue-600 text-white py-20"
      >

        <div className="max-w-7xl mx-auto text-center">

          <h2 className="text-4xl font-bold mb-6">
            Contact Us
          </h2>

          <p className="text-lg">
            support@queuecare.com
          </p>

          <p className="text-lg mt-2">
            +91 9876543210
          </p>

        </div>

      </section>

      {/* Footer */}

      <footer className="bg-white py-8 border-t border-blue-100">

        <div className="text-center">

          <h3 className="text-2xl font-bold text-blue-600">
            QueueCare
          </h3>

          <p className="text-slate-500 mt-2">
            Smart Hospital Queue Management
          </p>

        </div>

      </footer>

    </div>
  );
};

export default Home;