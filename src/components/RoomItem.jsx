import React from 'react';
import { Link } from 'react-router-dom';

function RoomItem({ room }) {
  return (
    <li>
      <h2>{room.naziv}</h2>
      <p>Kapacitet: {room.kapacitet}</p>
      <p>Opis: {room.opis}</p>
      <p>Cena po noći: {room.cenaPoNoci}</p>
      <img src={room.slikaUrl} alt={room.naziv} />
      <Link to={`/rezervacija/${room.id}`}>Rezerviši</Link>
    </li>
  );
}

export default RoomItem;
