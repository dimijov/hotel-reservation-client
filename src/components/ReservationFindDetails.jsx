
function ReservationFindDetails({ reservation, handleCancelReservation, error }) {
    return (
      <div>
        <h2>Detalji rezervacije</h2>
        <p>Email: {reservation.email}</p>
        <p>Datum početka: {reservation.datumPocetka}</p>
        <p>Datum završetka: {reservation.datumZavrsetka}</p>
        <p>Promo kod: {reservation.promoKod}</p>
        <p>Popust: {reservation.popust}%</p>
        <p>Ukupna cena: {reservation.ukupnaCena} RSD</p>
        <p>Aktivna: {reservation.aktivna ? 'Da' : 'Ne'}</p>
  
        <h3>Gosti</h3>
        <ul>
          {reservation.gosti.map((gost, index) => (
            <li key={index}>{gost.ime} {gost.prezime}</li>
          ))}
        </ul>
  
        <h3>Detalji sobe</h3>
        <p>Naziv: {reservation.soba.naziv}</p>
        <p>Kapacitet: {reservation.soba.kapacitet}</p>
        <p>Opis: {reservation.soba.opis}</p>
        <p>Cena po noći: {reservation.soba.cenaPoNoci} RSD</p>
        <img src={reservation.soba.slikaUrl} alt={reservation.soba.naziv} width="300" />
  
        <button onClick={handleCancelReservation}>Otkazati rezervaciju</button>
        {error && <div style={{ color: 'red' }}>{typeof error === 'string' ? error : JSON.stringify(error)}</div>}
      </div>
    );
  }

  export default ReservationFindDetails;