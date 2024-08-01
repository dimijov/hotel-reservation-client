import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RoomCard from '../components/RoomCard/RoomCard';

const RoomListPage = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/sobe')
      .then(response => response.json())
      .then(data => setRooms(data))
      .catch(error => console.error('Error fetching rooms:', error));
  }, []);

  return (
    <div>
      <Header />
      <main>
        <h1>Lista Soba</h1>
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
