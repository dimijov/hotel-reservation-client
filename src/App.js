import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ReservationAddPage from './pages/ReservationAddPage';
import ReservationDetailsPage from './pages/ReservationDetailsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rezervacija/:roomId" element={<ReservationAddPage />} />
        <Route path="/rezervacije" element={<ReservationDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
