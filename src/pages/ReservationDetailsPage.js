import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReservationDetailsCard from '../components/ReservationDetailsCard/ReservationDetailsCard';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import { handleApiError } from '../utils/api';

const ReservationDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reservation = location.state?.reservation; // Extract reservation from location state
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  if (!reservation) {
    return <p>Nema podataka o rezervaciji. Molimo vas da izvršite pretragu ili rezervaciju.</p>;
  }

  const handleCancel = () => {
    const confirmed = window.confirm('Da li ste sigurni da želite da otkažete rezervaciju?');
    if (confirmed) {
      fetch(`http://localhost:8080/api/rezervacije/${reservation.id}`, {
        method: 'DELETE'
      })
        .then(async response => {
          const contentType = response.headers.get('Content-Type');
          if (response.ok) {
            if (contentType && contentType.includes('application/json')) {
              const data = await response.json();
              return data.message || 'Rezervacija je uspešno otkazana.';
            } else {
              const text = await response.text();
              return text;
            }
          } else {
            const errorMessage = await handleApiError(response);
            if (errorMessage) {
              throw new Error(errorMessage);
            }
          }
        })
        .then(message => {
          setError(null);
          setSuccessMessage(message);
          setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds
        })
        .catch(error => {
          setError(error.message);
        });
    }
  };

  return (
    <div>
      <Header />
      <main>
        <h1>Detalji Rezervacije</h1>
        {error && <ErrorMessage message={error} />}
        {reservation ? (
          <div>
            <ReservationDetailsCard reservation={reservation} />
            <button onClick={handleCancel}>Otkaži rezervaciju</button>
          </div>
        ) : (
          <ErrorMessage message="Rezervacija nije pronađena" />
        )}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </main>
      <Footer />
    </div>
  );
};

export default ReservationDetailsPage;
