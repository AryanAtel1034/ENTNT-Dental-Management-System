import React from "react";
import { useNavigate } from "react-router-dom";
import { getIncidents } from "../utils/incidentStorage";
import { getPatients } from "../utils/storage";

const LandingPage = () => {
  const navigate = useNavigate();
  const incidents = getIncidents();
  const patients = getPatients();

  const revenue = incidents.reduce((sum, i) => sum + (Number(i.cost) || 0), 0);
  const completed = incidents.filter(i => i.status=== "completed").length;
  const pending = incidents.filter(i => !i.status || i.status== "completed").length;
  const upcoming = incidents
    .filter(i => i.appointmentDate)
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
    .slice(0, 10);
  const topPatients = patients.map(p => ({
    ...p,
    count: incidents.filter(i => i.patientId === p.id).length,
  })).sort((a, b) => b.count - a.count).slice(0, 4);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen text-gray-800 flex flex-col justify-between">
      
      {/* Navbar Section */}
      <nav className="flex flex-wrap justify-between items-center px-6 py-4 bg-white shadow-md sticky top-0 z-10">
        <div className="text-2xl font-bold text-blue-700">Dentel ENTNT</div>
        <div className="hidden md:flex flex-wrap gap-4 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-blue-800 transition">Pages</a>
          <a href="#" className="hover:text-blue-800 transition">About Center</a>
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

      
     
    </div>
  );
};

export default LandingPage;
