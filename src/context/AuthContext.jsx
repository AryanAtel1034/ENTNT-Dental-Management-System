import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const dummyUsers = [
  {
    id: "1",
    role: "Admin",
    email: "admin@entnt.in",
    password: "admin123"
  },
  {
    id: "2",
    role: "Patient",
    email: "john@entnt.in",
    password: "patient123",
    patientId: "p1"
  }
];

function AuthProvider(props) {
  const [currentUser, setCurrentUser] = useState(() => {
    const data = localStorage.getItem("user");
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  });

  function login(email, password) {
    let match = null;

    for (let i = 0; i < dummyUsers.length; i++) {
      let u = dummyUsers[i];
      if (u.email === email && u.password === password) {
        match = u;
        break;
      }
    }

    if (match) {
      setCurrentUser(match);
      localStorage.setItem("user", JSON.stringify(match));
      return {
        success: true,
        user: match
      };
    } else {
      return {
        success: false
      };
    }
  }

  function logout(redirectFn) {
    setCurrentUser(null);
    localStorage.removeItem("user");
    if (redirectFn && typeof redirectFn === "function") {
      redirectFn();
    }
  }

  return (
    <AuthContext.Provider value={{ user: currentUser, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
