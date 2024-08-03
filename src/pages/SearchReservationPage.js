import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import { handleApiError } from '../utils/api';

const SearchReservationPage = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/api/rezervacije?email=${email}&token=${token}`)
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
    <div>
      <Header />
      <main>
        <h1>Pretraga Rezervacija</h1>
        <form onSubmit={handleSearch}>
          <label>Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>Token:
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
          </label>
          <button type="submit">Pretraga</button>
        </form>
        {error && <ErrorMessage message={error} />}
      </main>
      <Footer />
    </div>
  );
};

export default SearchReservationPage;
