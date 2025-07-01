import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getIncidents } from "../utils/incidentStorage";
import { getPatients } from "../utils/storage";
import PatientList from "./patients/PatientList";

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    completed: 0,
    pending: 0,
    topPatients: [],
  });

  const fetchData = () => {
    const inc = getIncidents();
    const pats = getPatients();

    const upcoming = inc
      .filter(i => i.appointmentDate)
      .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
      .slice(0, 10);

    const revenue = inc.reduce((sum, i) => sum + (Number(i.cost) || 0), 0);
    const completed = inc.filter(i => i.status?.toLowerCase() === "completed").length;
    const pending = inc.filter(i => !i.status || i.status.toLowerCase() !== "completed").length;

    const topPatients = pats.map(p => ({
      ...p,
      count: inc.filter(i => i.patientId === p.id).length,
    })).sort((a, b) => b.count - a.count).slice(0, 5);

    setAppointments(upcoming);
    setStats({ totalRevenue: revenue, completed, pending, topPatients });
  };

  useEffect(() => {
    fetchData();
    window.addEventListener("focus", fetchData);
    return () => window.removeEventListener("focus", fetchData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold text-center sm:text-left mb-4 sm:mb-0">Admin Dashboard</h1>
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/admin/calendar")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              View Calendar
            </button>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white shadow-xl rounded-lg p-6 text-center">
            <p className="text-sm text-gray-500">Total Revenue</p>
            <h2 className="text-2xl font-bold mt-2">₹{stats.totalRevenue}</h2>
          </div>
          <div className="bg-white shadow-xl rounded-lg p-6 text-center">
            <p className="text-sm text-gray-500">Completed Treatments</p>
            <h2 className="text-2xl font-bold mt-2">{stats.completed}</h2>
          </div>
          <div className="bg-white shadow-xl rounded-lg p-6 text-center">
            <p className="text-sm text-gray-500">Pending Treatments</p>
            <h2 className="text-2xl font-bold mt-2">{stats.pending}</h2>
          </div>
          <div className="bg-white shadow-xl rounded-lg p-6 text-center">
            <p className="text-sm text-gray-500">Top Patient</p>
            <h2 className="text-2xl font-bold mt-2">{stats.topPatients[0]?.name || "-"}</h2>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Next 10 Appointments</h2>
          <div className="overflow-x-auto">
            <table className="w-full border text-left text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">Title</th>
                  <th className="p-2">Patient</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(a => (
                  <tr key={a.id} className="border-t">
                    <td className="p-2">{a.title}</td>
                    <td className="p-2">{getPatients().find(p => p.id === a.patientId)?.name}</td>
                    <td className="p-2">{new Date(a.appointmentDate).toLocaleString()}</td>
                    <td className="p-2">{a.status || "Pending"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Patients */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Top Patients (by number of visits)</h2>
          <ul className="list-disc pl-6 space-y-1">
            {stats.topPatients.map(p => (
              <li key={p.id}>
                {p.name} — {p.count} visit(s)
              </li>
            ))}
          </ul>
        </div>

        {/* Patient List */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <PatientList />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
