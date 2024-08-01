import React from 'react';
import './ReservationDetailsCard.css';
import RoomCard from '../RoomCard/RoomCard'

const ReservationDetailsCard = ({ reservation }) => (
  <div className="reservation-details-card">
    <h3>Rezervacija za {reservation.soba.naziv}</h3>
    <p>Email: {reservation.email}</p>
    <p>Datum početka: {reservation.datumPocetka}</p>
    <p>Datum završetka: {reservation.datumZavrsetka}</p>
    <p>Promo kod: {reservation.promoKod}</p>
    <p>Gosti:</p>
    <ul>
      {reservation.gosti.map((guest, index) => (
        <li key={index}>{guest.ime} {guest.prezime}</li>
      ))}
    </ul>
    <p>Ukupna cena: {reservation.ukupnaCena}</p>
    <div>
      <h4>Podaci o sobi:</h4>
      <RoomCard room={reservation.soba} showReserveButton={false} />
    </div>
  </div>
);

export default ReservationDetailsCard;
