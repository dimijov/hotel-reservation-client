import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReservationDetailsCard from '../components/ReservationDetailsCard/ReservationDetailsCard'
import ErrorMessage from '../components/ErrorMessage/ErrorMessage'


const ReservationDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reservation = location.state?.reservation;
  const [error, setError] = useState(null);

  if (!reservation) {
    return <p>Nema podataka o rezervaciji. Molimo vas da izvršite pretragu ili rezervaciju.</p>;
  }

  const handleCancel = () => {
    fetch(`http://localhost:8080/api/rezervacije/${reservation.id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Greška prilikom otkazivanja rezervacije');
        }
        return response.json();
      })
      .then(data => {
        // Preusmeri nazad na početnu stranicu ili prikaži poruku o uspešnom otkazivanju
        setError(null);
        navigate('/');
      })
      .catch(error => {
        setError(error.message);
      });
  };

  return (
    <div>
      <Header />
      <main>
        <h1>Detalji Rezervacije</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {reservation ? (
          <div>
            <div>
              <ReservationDetailsCard reservation={reservation} />
            </div>
            <div>
              <button onClick={handleCancel}>Otkaži rezervaciju</button>
            </div>
          </div>
        ) : (
          <ErrorMessage message="Rezervacija nije pronađena" />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ReservationDetailsPage;
