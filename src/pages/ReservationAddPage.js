// ReservationAddPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReservationForm from '../components/ReservationForm/ReservationForm';
import RoomCard from '../components/RoomCard/RoomCard';

const ReservationAddPage = () => {
  const { roomId } = useParams(); // Uzimanje roomId iz URL-a
  const [room, setRoom] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (roomId) {
      fetch(`http://localhost:8080/api/sobe/${roomId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Soba nije pronađena'); // Ako status nije OK, baci grešku
          }
          return response.json();
        })
        .then(data => setRoom(data))
        .catch(error => {
          console.error('Error fetching room details:', error);
          setError(error.message); // Postavi grešku u stanje
        });
    }
  }, [roomId]);

  if (error) return <p>{error}</p>; // Prikaži grešku ako postoji

  if (!room) return <p>Loading...</p>; // Prikaži Loading... dok se podaci učitavaju

  return (
    <div>
      <Header />
      <main>
        <h1>Rezervacija Sobe</h1>
        <div>
          <ReservationForm roomId={room.id} />
        </div>
        <div>
          <RoomCard room={room} showReserveButton={false}/>  
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReservationAddPage;
