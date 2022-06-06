import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./components/pages/Dashboard";
import FullnamePage from "./components/pages/Login/full-name";
import BirthdatePage from "./components/pages/Login/birth-date";

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
  outlet: JSX.Element;
};

function ProtectedRoute({isAuthenticated, authenticationPath, outlet}: ProtectedRouteProps) {
  if(isAuthenticated) {
    return outlet;
  } else {
    return <Navigate to={{ pathname: authenticationPath }} />;
  }
}

function App() {
  const name = localStorage.getItem("name");
  const birthday = localStorage.getItem("birthday");
  const isName = name !== null ? JSON.parse(name) : false;
  const isBirthday = birthday !== null ? JSON.parse(birthday) : false;

  const defaultProtectedRoutePropsByName: Omit<ProtectedRouteProps, 'outlet'> = {
    isAuthenticated: isName,
    authenticationPath: '/full-name',
  };

  const defaultProtectedRoutePropsByBirthday: Omit<ProtectedRouteProps, 'outlet'> = {
    isAuthenticated: isBirthday,
    authenticationPath: '/birth-date',
  };

  return (
    <div className="App">
      <Routes>
        <Route path='dashboard' element={<ProtectedRoute {...defaultProtectedRoutePropsByBirthday} outlet={<DashboardPage />} />} />
        <Route path='*' element={<ProtectedRoute isAuthenticated={false} authenticationPath='/full-name' outlet={<DashboardPage />} />} />
        <Route path="/full-name" element={<FullnamePage />} />
        <Route path="/birth-date" element={<ProtectedRoute {...defaultProtectedRoutePropsByName} outlet={<BirthdatePage />} />} />
      </Routes>
    </div>
  );
}

export default App;
