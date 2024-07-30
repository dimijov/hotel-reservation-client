import React from 'react';

function GuestForm({ index, guest, handleGuestChange, handleRemoveGuest, fieldErrors }) {
  return (
    <div>
      <div>
        <label>Ime:</label>
        <input type="text" name="ime" value={guest.ime} onChange={(e) => handleGuestChange(index, e)} required />
        {fieldErrors[`gosti[${index}].ime`] && <div style={{ color: 'red' }}>{fieldErrors[`gosti[${index}].ime`]}</div>}
      </div>
      <div>
       <label>Prezime:</label>
        <input type="text" name="prezime" value={guest.prezime} onChange={(e) => handleGuestChange(index, e)} required />
        {fieldErrors[`gosti[${index}].prezime`] && <div style={{ color: 'red' }}>{fieldErrors[`gosti[${index}].prezime`]}</div>}
      </div>
      <button type="button" onClick={() => handleRemoveGuest(index)}>Ukloni gosta</button>
    </div>
  );
}

export default GuestForm;
