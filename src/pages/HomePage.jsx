import React from 'react';
import RoomList from '../components/RoomList';

function HomePage() {
  return (
    <div>
      <h1>Dobrodošli u hotel FONsion</h1>
      <p>Osnovne karakteristike hotela...</p>
      <RoomList />
    </div>
  );
}

export default HomePage;