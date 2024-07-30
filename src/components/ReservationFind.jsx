import React, { useState } from 'react';
import api from '../Api'; // Koristimo vaš prethodno definisani API instance

function ReservationFind() {
  const [reservation, setReservation] = useState(null);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.get(`/rezervacije`, { params: { email, token } });
      setReservation(response.data);
    } catch (error) {
      console.error('Greška prilikom dobijanja detalja rezervacije!', error);
      setError(error.response ? error.response.data : 'Greška prilikom dobijanja detalja rezervacije!');
    }
  };

  const handleCancelReservation = async () => {
    setError('');
    try {
      await api.delete(`/rezervacije/${reservation.id}`);
      setReservation(null);
    } catch (error) {
      console.error('Greška prilikom otkazivanja rezervacije!', error);
      setError(error.response ? error.response.data : 'Greška prilikom otkazivanja rezervacije!');
    }
  };

  return (
    <div>
      {!reservation ? (
        <ReservationFindForm
          email={email}
          setEmail={setEmail}
          token={token}
          setToken={setToken}
          handleSubmit={handleSubmit}
          error={error}
        />
      ) : (
        <ReservationfindDetails
          reservation={reservation}
          handleCancelReservation={handleCancelReservation}
          error={error}
        />
      )}
    </div>
  );
}

export default ReservationFind;
