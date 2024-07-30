import React, { useState, useEffect } from 'react';
import api from '../Api';
import RoomItem from './RoomItem';

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await api.get('/sobe');
        setRooms(response.data);
      } catch (error) {
        setError(error.response ? error.response.data : 'Greška prilikom dobijanja soba!');
        console.error(error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div>
      <h1>Dostupne sobe</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ul>
        {rooms.map((room) => (
          <RoomItem key={room.id} room={room} />
        ))}
      </ul>
    </div>
  );
}

export default RoomList;