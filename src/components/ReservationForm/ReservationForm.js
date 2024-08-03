import React, { useState } from 'react';
import './ReservationForm.css';
import GuestForm from '../GuestForm/GuestForm';
import { useNavigate } from 'react-router-dom';
import { handleApiError } from '../../utils/api';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const ReservationForm = ({ roomId }) => {
  const [formData, setFormData] = useState({
    email: '',
    datumPocetka: '',
    datumZavrsetka: '',
    promoKod: '',
    gosti: [{ ime: '', prezime: '' }]
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/api/rezervacije', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...formData, soba: { id: roomId } })
    })
      .then(async response => {
        const errorMessage = await handleApiError(response);
        if (errorMessage) {
          throw new Error(errorMessage);
        }
        return response.json();
      })
      .then(data => {
        setError(null);
        navigate(`/detalji/${data.id}`, { state: { reservation: data } });
      })
      .catch(error => {
        setError(error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <label>Datum početka:
        <input type="date" name="datumPocetka" value={formData.datumPocetka} onChange={handleChange} required />
      </label>
      <label>Datum završetka:
        <input type="date" name="datumZavrsetka" value={formData.datumZavrsetka} onChange={handleChange} required />
      </label>
      <label>Promo kod:
        <input type="text" name="promoKod" value={formData.promoKod} onChange={handleChange} />
      </label>
      <GuestForm gosti={formData.gosti} setGosti={(gosti) => setFormData({ ...formData, gosti })} />
      {error && <ErrorMessage message={error} />}
      <button type="submit">Rezerviši</button>
    </form>
  );
};

export default ReservationForm;
