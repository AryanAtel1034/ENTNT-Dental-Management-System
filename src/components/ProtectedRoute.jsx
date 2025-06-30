import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute(props) {
  const auth = useAuth();

  if (!auth.user) {
    return <Navigate to="/login" />;
  }

  if (props.role && auth.user.role !== props.role) {
    return <Navigate to="/" />;
  }

  return props.children;
}

export default ProtectedRoute;
