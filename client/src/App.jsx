import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

// Lazy load all pages for code splitting
const Home = React.lazy(() => import('./pages/Home'));
const Meeting = React.lazy(() => import('./pages/Meeting'));
const Meetings = React.lazy(() => import('./pages/Meetings'));
const Recordings = React.lazy(() => import('./pages/Recordings'));
const Schedules = React.lazy(() => import('./pages/Schedules'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Account = React.lazy(() => import('./pages/Account'));
const Help = React.lazy(() => import('./pages/Help'));

// Loading fallback component
const PageLoader = () => (
  <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(180deg, #0a0a0f 0%, #12121a 100%)',
    }}
  >
    <CircularProgress size={48} sx={{ color: '#6366f1' }} />
  </Box>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
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
      </Suspense>
    </Router>
  );
}

export default App;
