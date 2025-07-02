import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import CalendarPage from "./pages/CalendarPage";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
     
        <Route path="/" element={<LandingPage />} />


        <Route path="/login" element={<Login />} />

        
        <Route
          path="/redirect"
          element={
            user ? (
              user.role === "Admin" ? <Navigate to="/admin" /> : <Navigate to="/patient" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="Admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

     
        <Route
          path="/admin/calendar"
          element={
            <ProtectedRoute role="Admin">
              <CalendarPage />
            </ProtectedRoute>
          }
        />

       
        <Route
          path="/patient"
          element={
            <ProtectedRoute role="Patient">
              <PatientDashboard />
            </ProtectedRoute>
          }
        />

       
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
