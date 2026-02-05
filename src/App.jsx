// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./components/DoctorDashboard";
import Billing from "./components/Billing";
import Autopost from "./components/SocialMedia";
import Settings from "./components/Settings";
import Patients from "./components/Patients";
import CaptureVitals from "./components/Capturevitals";
import Consultation from "./components/Consultation";
import Followups from "./components/Followups";
import Appointment from "./components/Appointment";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/socialmedia" element={<Autopost />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/patient" element={<Patients />} />
            <Route path="/capture" element={<CaptureVitals />} />
            <Route path="/capture/:patientId" element={<CaptureVitals />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/followups" element={<Followups />} />
            <Route path="/appointment" element={<Appointment />} />

            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center text-black font-semibold">
                  404 — Page Not Found
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
