import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Simulation from './pages/Simulation';
import IndiaMonitor from './pages/IndiaMonitor';
import Reports from './pages/Reports';
import About from './pages/About';
import Education from './pages/Education';
import DisasterScience from './pages/DisasterScience';
import EmergencyPreparedness from './pages/EmergencyPreparedness';
import HistoricalCases from './pages/HistoricalCases';
import CommunityResponse from './pages/CommunityResponse';
import GlobalImpact from './pages/GlobalImpact';
import SurvivalSkills from './pages/SurvivalSkills';
import AlertsSidebar from './components/AlertsSidebar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-disaster-dark text-white overflow-x-hidden">
        <Navbar />
        <AlertsSidebar />
        
        <AnimatePresence mode="wait">
          <Routes>
            <Route 
              path="/" 
              element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Home />
                </motion.div>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Dashboard />
                </motion.div>
              } 
            />
            <Route 
              path="/simulation" 
              element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Simulation />
                </motion.div>
              } 
            />
            <Route 
              path="/india" 
              element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <IndiaMonitor />
                </motion.div>
              } 
            />
            <Route 
              path="/reports" 
              element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Reports />
                </motion.div>
              } 
            />
            <Route 
              path="/reports/:reportId" 
              element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Reports />
                </motion.div>
              } 
            />
            <Route 
              path="/about" 
              element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <About />
                </motion.div>
              } 
            />
            <Route 
              path="/education" 
              element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Education />
                </motion.div>
              } 
            />
            <Route path="/education/disaster-science" element={<DisasterScience />} />
            <Route path="/education/emergency-preparedness" element={<EmergencyPreparedness />} />
            <Route path="/education/historical-cases" element={<HistoricalCases />} />
            <Route path="/community-response" element={<CommunityResponse />} />
            <Route path="/global-impact" element={<GlobalImpact />} />
            <Route path="/survival-skills" element={<SurvivalSkills />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
