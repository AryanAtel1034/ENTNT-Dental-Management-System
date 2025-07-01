import React from "react";
import { useNavigate } from "react-router-dom";
import { getIncidents } from "../utils/incidentStorage";
import { getPatients } from "../utils/storage";

const LandingPage = () => {
  const navigate = useNavigate();
  const incidents = getIncidents();
  const patients = getPatients();

  const revenue = incidents.reduce((sum, i) => sum + (Number(i.cost) || 0), 0);
  const completed = incidents.filter(i => i.status?.toLowerCase() === "completed").length;
  const pending = incidents.filter(i => !i.status || i.status.toLowerCase() !== "completed").length;
  const upcoming = incidents
    .filter(i => i.appointmentDate)
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
    .slice(0, 10);
  const topPatients = patients.map(p => ({
    ...p,
    count: incidents.filter(i => i.patientId === p.id).length,
  })).sort((a, b) => b.count - a.count).slice(0, 3);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen text-gray-800 flex flex-col justify-between">
      
      {/* Navbar Section */}
      <nav className="flex flex-wrap justify-between items-center px-6 py-4 bg-white shadow-md sticky top-0 z-10">
        <div className="text-2xl font-bold text-blue-700">Dentel ENTNT</div>
        <div className="hidden md:flex flex-wrap gap-4 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-blue-600 transition">Pages</a>
          <a href="#" className="hover:text-blue-600 transition">About Center</a>
          <a href="#" className="hover:text-blue-600 transition">Treatments</a>
          <a href="#" className="hover:text-blue-600 transition">Fees</a>
          <a href="#" className="hover:text-blue-600 transition">Medical Team</a>
          <a href="#" className="hover:text-blue-600 transition">Contact Us</a>
        </div>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm mt-4 md:mt-0"
        >
          Login
        </button>
      </nav>
      <header className="text-center px-4 py-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-snug mb-4">
          High Quality <span className="text-blue-600">and Painless</span> Dentistry
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          If you are in need of high-quality, professional and friendly dental care,
          look no further than our clinic.
        </p>
      </header>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 pb-16 max-w-6xl mx-auto text-center">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <h2 className="text-2xl font-bold mt-1">₹{revenue}</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-sm text-gray-500">Completed Treatments</p>
          <h2 className="text-2xl font-bold mt-1">{completed}</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-sm text-gray-500">Pending Treatments</p>
          <h2 className="text-2xl font-bold mt-1">{pending}</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-sm text-gray-500">Top Patient</p>
          <h2 className="text-2xl font-bold mt-1">{topPatients || "-"}</h2>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
