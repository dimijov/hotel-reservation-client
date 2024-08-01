import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RoomListPage from './pages/RoomListPage';
import ReservationAddPage from './pages/ReservationAddPage';
import ReservationDetailsPage from './pages/ReservationDetailsPage';
import SearchReservationPage from './pages/SearchReservationPage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sobe" element={<RoomListPage />} />
      <Route path="/rezervacija/:roomId" element={<ReservationAddPage />} />
      <Route path="/detalji/:id" element={<ReservationDetailsPage />} />
      <Route path="/pretraga" element={<SearchReservationPage />} />
    </Routes>
  </Router>
);

export default App;
