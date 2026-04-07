import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Meeting from './pages/Meeting';
import Meetings from './pages/Meetings';
import Recordings from './pages/Recordings';
import Schedules from './pages/Schedules';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Help from './pages/Help';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meeting/:id" element={<Meeting />} />
        <Route path="/meetings" element={<Meetings />} />
        <Route path="/recordings" element={<Recordings />} />
        <Route path="/schedules" element={<Schedules />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/account" element={<Account />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </Router>
  );
}

export default App;
