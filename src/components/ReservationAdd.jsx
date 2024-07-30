import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../Api';
import GuestForm from './GuestForm';

function ReservationAdd() {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    datumPocetka: '',
    datumZavrsetka: '',
    promoKod: '',
    gosti: [{ ime: '', prezime: '' }]
  });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [roomError, setRoomError] = useState('');
  const [reservationSuccess, setReservationSuccess] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      setRoomError('');
      try {
        const response = await api.get(`/sobe/${roomId}`);
        setRoom(response.data);
      } catch (error) {
        setError(error.response ? error.response.data : 'Greška prilikom dobijanja sobe!');
        console.error(error);
      }
    };

    fetchRoom();
  }, [roomId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGuestChange = (index, e) => {
    const newGosti = formData.gosti.map((gost, i) => {
      if (i !== index) return gost;
      return { ...gost, [e.target.name]: e.target.value };
    });
    setFormData({ ...formData, gosti: newGosti });
  };

  const handleAddGuest = () => {
    setFormData({ ...formData, gosti: [...formData.gosti, { ime: '', prezime: '' }] });
  };

  const handleRemoveGuest = (index) => {
    const newGosti = formData.gosti.filter((_, i) => i !== index);
    setFormData({ ...formData, gosti: newGosti });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    
    const reservationData = {
      ...formData,
      soba: { id: roomId }
    };
    
    try {
      const response = await api.post('/rezervacije', reservationData);
      setReservationSuccess(response.data);
    } catch (error) {
      setError(error.response ? error.response.data : 'Greška prilikom kreiranja rezervacije!');
      console.error(error);
    }
  };

  return (
    <div>
      {roomError && <div style={{ color: 'red' }}>{roomError}</div>}
      {reservationSuccess ? (
        <div>
          <h1>Rezervacija uspešna!</h1>
          <p>Rezervacija ID: {reservationSuccess.id}</p>
          <p>Email: {reservationSuccess.email}</p>
          <p>Datum početka: {reservationSuccess.datumPocetka}</p>
          <p>Datum završetka: {reservationSuccess.datumZavrsetka}</p>
          <p>Promo kod: {reservationSuccess.promoKod}</p>
          <p>Popust: {reservationSuccess.popust}%</p>
          <p>Ukupna cena: {reservationSuccess.ukupnaCena}</p>
          <p>Aktivna: {reservationSuccess.aktivna ? 'Da' : 'Ne'}</p>
          <p>Token: {reservationSuccess.token}</p>
          <h2>Gosti:</h2>
          <ul>
            {reservationSuccess.gosti.map((gost, index) => (
              <li key={index}>{gost.ime} {gost.prezime}</li>
            ))}
          </ul>
          <h2>Podaci o sobi:</h2>
          <p>Naziv: {reservationSuccess.soba.naziv}</p>
          <p>Kapacitet: {reservationSuccess.soba.kapacitet}</p>
          <p>Opis: {reservationSuccess.soba.opis}</p>
          <p>Cena po noći: {reservationSuccess.soba.cenaPoNoci}</p>
          <img src={reservationSuccess.soba.slikaUrl} alt={reservationSuccess.soba.naziv} />
        </div>
      ) : (
        <>
          {room && (
            <div>
              <h1>Rezervacija za sobu: {room.naziv}</h1>
              <img src={room.slikaUrl} alt={room.naziv} />
              <p>Kapacitet: {room.kapacitet}</p>
              <p>Opis: {room.opis}</p>
              <p>Cena po noći: {room.cenaPoNoci}</p>
            </div>
          )}
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            {fieldErrors.email && <div style={{ color: 'red' }}>{fieldErrors.email}</div>}
            
            <label>Datum početka:</label>
            <input type="date" name="datumPocetka" value={formData.datumPocetka} onChange={handleChange} required />
            {fieldErrors.datumPocetka && <div style={{ color: 'red' }}>{fieldErrors.datumPocetka}</div>}
            
            <label>Datum završetka:</label>
            <input type="date" name="datumZavrsetka" value={formData.datumZavrsetka} onChange={handleChange} required />
            {fieldErrors.datumZavrsetka && <div style={{ color: 'red' }}>{fieldErrors.datumZavrsetka}</div>}
            
            <div>
              {formData.gosti.map((gost, index) => (
                <GuestForm
                  key={index}
                  index={index}
                  guest={gost}
                  handleGuestChange={handleGuestChange}
                  handleRemoveGuest={handleRemoveGuest}
                  fieldErrors={fieldErrors}
                />
              ))}
              <button type="button" onClick={handleAddGuest}>Dodaj gosta</button>
            </div>
            
            <label>Promo kod:</label>
            <input type="text" name="promoKod" value={formData.promoKod} onChange={handleChange} />
            {fieldErrors.promoKod && <div style={{ color: 'red' }}>{fieldErrors.promoKod}</div>}
            
            <button type="submit">Rezerviši</button>
          </form>
        </>
      )}
    </div>
  );
}

export default ReservationAdd;