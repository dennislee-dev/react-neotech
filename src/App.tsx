import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./components/pages/Dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<DashboardPage deleted={false} />} />
        <Route path='deleted-employees' element={<DashboardPage deleted={true} />} />
        <Route path='*'  element={<DashboardPage deleted={false} />} />
      </Routes>
    </div>
  );
}

export default App;
