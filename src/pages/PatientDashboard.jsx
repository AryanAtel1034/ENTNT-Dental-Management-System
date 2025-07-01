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
    const profile = pats.find((p) => p.id === user.profile);
    setMyProfile(profile);

    const myIncidents = getIncidents().filter(
      (i) => i.patientId === user.profile
    );
    setMyAppointments(myIncidents);
  }, [user]);

  const handleLogout = () => {
    logout(() => navigate("/")); 
  };

  