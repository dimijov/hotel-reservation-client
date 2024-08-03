import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RoomCard from '../components/RoomCard/RoomCard';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import { handleApiError } from '../utils/api';

const RoomListPage = () => {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/sobe')
      .then(async response => {
        const errorMessage = await handleApiError(response);
        if (errorMessage) {
          throw new Error(errorMessage);
        }
        return response.json();
      })
      .then(data => {
        setError(null);
        setRooms(data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <Header />
      <main>
        <h1>Lista Soba</h1>
        {error && <ErrorMessage message={error} />}
        <div>
          {rooms.map(room => (
            <RoomCard key={room.id} room={room} showReserveButton={true} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RoomListPage;
