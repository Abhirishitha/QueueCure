import { useState } from "react";
import { Calendar, User, Phone, Clock } from "lucide-react";
import toast from "react-hot-toast";

const AppointmentBooking = () => {
  const [formData, setFormData] =
    useState({
      patientName: "",
      phone: "",
      age: "",
      doctor: "",
      date: "",
      slot: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success(
      "Appointment Booked Successfully"
    );

    setFormData({
      patientName: "",
      phone: "",
      age: "",
      doctor: "",
      date: "",
      slot: "",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8">

        <h1 className="text-4xl font-bold mb-2">
          Book Appointment
        </h1>

        <p className="text-slate-500 mb-8">
          Schedule your visit without waiting in long queues
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label className="font-medium">
              Patient Name
            </label>

            <div className="flex items-center border rounded-xl mt-2 px-3">
              <User size={18} />
              <input
                type="text"
                name="patientName"
                value={
                  formData.patientName
                }
                onChange={
                  handleChange
                }
                className="w-full p-3 outline-none"
                placeholder="Enter name"
              />
            </div>
          </div>

          <div>
            <label className="font-medium">
              Phone Number
            </label>

            <div className="flex items-center border rounded-xl mt-2 px-3">
              <Phone size={18} />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={
                  handleChange
                }
                className="w-full p-3 outline-none"
                placeholder="Enter phone"
              />
            </div>
          </div>

          <div>
            <label className="font-medium">
              Age
            </label>

            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={
                handleChange
              }
              className="w-full border rounded-xl p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-medium">
              Doctor
            </label>

            <select
              name="doctor"
              value={formData.doctor}
              onChange={
                handleChange
              }
              className="w-full border rounded-xl p-3 mt-2"
            >
              <option value="">
                Select Doctor
              </option>

              <option>
                Dr. Sharma
              </option>

              <option>
                Dr. Priya
              </option>

              <option>
                Dr. Kumar
              </option>
            </select>
          </div>

          <div>
            <label className="font-medium">
              Appointment Date
            </label>

            <div className="flex items-center border rounded-xl mt-2 px-3">
              <Calendar size={18} />

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={
                  handleChange
                }
                className="w-full p-3 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-medium">
              Time Slot
            </label>

            <div className="flex items-center border rounded-xl mt-2 px-3">
              <Clock size={18} />

              <select
                name="slot"
                value={formData.slot}
                onChange={
                  handleChange
                }
                className="w-full p-3 outline-none"
              >
                <option value="">
                  Select Slot
                </option>

                <option>
                  09:00 AM
                </option>

                <option>
                  09:30 AM
                </option>

                <option>
                  10:00 AM
                </option>

                <option>
                  10:30 AM
                </option>

                <option>
                  11:00 AM
                </option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold"
          >
            Book Appointment
          </button>

        </form>

      </div>

    </div>
  );
};

export default AppointmentBooking;