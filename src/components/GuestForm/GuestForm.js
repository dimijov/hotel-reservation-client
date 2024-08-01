import React from 'react';

const GuestForm = ({ gosti, setGosti }) => {
  const handleGuestChange = (index, e) => {
    const { name, value } = e.target;
    const newGuests = [...gosti];
    newGuests[index] = { ...newGuests[index], [name]: value };
    setGosti(newGuests);
  };

  const addGuest = () => {
    setGosti([...gosti, { ime: '', prezime: '' }]);
  };

  const removeGuest = (index) => {
    if (gosti.length > 1) {
      setGosti(gosti.filter((_, i) => i !== index));
    }
  };

  return (
    <div>
      {gosti.map((guest, index) => (
        <div key={index}>
          <label>Ime:
            <input type="text" name="ime" value={guest.ime} onChange={(e) => handleGuestChange(index, e)} required />
          </label>
          <label>Prezime:
            <input type="text" name="prezime" value={guest.prezime} onChange={(e) => handleGuestChange(index, e)} required />
          </label>
          <button type="button" onClick={() => removeGuest(index)}>Ukloni gosta</button>
        </div>
      ))}
      <button type="button" onClick={addGuest}>Dodaj gosta</button>
    </div>
  );
};

export default GuestForm;
