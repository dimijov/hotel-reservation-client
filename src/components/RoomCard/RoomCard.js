import React from 'react';
import { Link } from 'react-router-dom';
import './RoomCard.css';

const RoomCard = ({ room, showReserveButton = false }) => {
  return (
    <div className="room-card">
      <img src={room.slikaUrl} alt={room.naziv} className="room-image" />
      <h2>{room.naziv}</h2>
      <p>Kapacitet: {room.kapacitet}</p>
      <p>Opis: {room.opis}</p>
      <p>Cena po noći: {room.cenaPoNoci} RSD</p>
      {showReserveButton && (
        <Link to={`/rezervacija/${room.id}`} className="reserve-button">
          Rezerviši
        </Link>
      )}
    </div>
  );
};

export default RoomCard;
