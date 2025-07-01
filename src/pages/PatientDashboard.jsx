import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getIncidents } from "../utils/incidentStorage";
import { getPatients } from "../utils/storage";

const PatientDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [myProfile, setMyProfile] = useState(null);
  const [myAppointments, setMyAppointments] = useState([]);

  useEffect(() => {
    if (!user || user.role !== "Patient") return;
    const pats = getPatients();
    const profile = pats.find((p) => p.id === user.patientId);
    setMyProfile(profile);

    const myIncidents = getIncidents().filter(
      (i) => i.patientId === user.patientId
    );
    setMyAppointments(myIncidents);
  }, [user]);

  const handleLogout = () => {
    logout(() => navigate("/")); 
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Patient Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        
        {myProfile && (
          <div className="bg-white p-6 rounded-lg shadow-md space-y-2">
            <h2 className="text-xl font-semibold mb-2">My Profile</h2>
            <p>
              <strong>Name:</strong> {myProfile.name}
            </p>
            <p>
              <strong>DOB:</strong> {myProfile.dob}
            </p>
            <p>
              <strong>Contact:</strong> {myProfile.contact}
            </p>
            <p>
              <strong>Health Info:</strong> {myProfile.healthInfo}
            </p>
          </div>
        )}

    
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">My Appointments</h2>
          {myAppointments.length === 0 ? (
            <p>No records found.</p>
          ) : (
            <div className="space-y-4">
              {myAppointments.map((app) => (
                <div
                  key={app.id}
                  className="border rounded p-4 shadow bg-gray-50"
                >
                  <p>
                    <strong>Title:</strong> {app.title}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(app.appointmentDate).toLocaleString()}
                  </p>
                  <p>
                    <strong>Status:</strong> {app.status || "Pending"}
                  </p>
                  <p>
                    <strong>Treatment:</strong> {app.treatment || "N/A"}
                  </p>
                  <p>
                    <strong>Cost:</strong> ₹{app.cost || 0}
                  </p>
                  <p>
                    <strong>Next Date:</strong> {app.nextDate || "N/A"}
                  </p>
                  {app.files?.length > 0 && (
                    <div className="mt-2">
                      <strong>Files:</strong>
                      <div className="flex gap-2 mt-1 flex-wrap">
                        {app.files.map((f, i) => (
                          <a
                            key={i}
                            href={f.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline text-sm bg-white px-2 py-1 rounded shadow"
                          >
                            {f.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
