import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./Signup";
import ReportIssue from "./ReportIssue";
import AnalyticsDashboard from "./AnalyticsDashboard";
import VolunteerMatch from "./VolunteerMatch";
import Chatbot from "./Chatbot";
import Navbar from "./Navbar";
import LiveDashboard from "./LiveDashboard";
import SmartVolunteer from "./SmartVolunteer";

function App() {

  return (

    <BrowserRouter>

       <Navbar />

      <Routes>

        <Route path="/" element={<AnalyticsDashboard />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/report" element={<ReportIssue />} />

        <Route path="/volunteer" element={<VolunteerMatch />} />

        <Route path="/chatbot" element={<Chatbot />} />

        <Route path="/live" element={<LiveDashboard />} />

        <Route path="/smart" element={<SmartVolunteer />} />

      </Routes>

    </BrowserRouter>

  );
}

export default App;