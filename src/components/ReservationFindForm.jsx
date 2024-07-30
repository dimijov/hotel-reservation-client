
function ReservationFindForm({ email, setEmail, token, setToken, handleSubmit, error }) {
  return (
    <form onSubmit={handleSubmit}>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <label>Token:</label>
      <input type="text" value={token} onChange={(e) => setToken(e.target.value)} required />

      <button type="submit">Prikaži detalje</button>
      {error && <div style={{ color: 'red' }}>{typeof error === 'string' ? error : JSON.stringify(error)}</div>}
    </form>
  );
}

export default ReservationFindForm;