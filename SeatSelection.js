import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SeatSelection = ({ movieId, showtime }) => {
  const [seats, setSeats] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const fetchSeats = async () => {
      const response = await axios.get(`/api/movies/${movieId}`);
      setSeats(response.data.seats);
    };
    fetchSeats();
  }, [movieId]);

  const handleSeatClick = (seatNumber) => {
    setSelectedSeats(prev =>
      prev.includes(seatNumber)
        ? prev.filter(seat => seat !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/api/bookings', {
        movieId,
        seats: selectedSeats,
        showtime,
        token: 'your-stripe-token', // Replace with actual Stripe token
      });
      alert('Booking successful');
    } catch (err) {
      alert('Booking failed');
    }
  };

  return (
    <div>
      <div className="seat-map">
        {Object.keys(seats).map(seatNumber => (
          <div
            key={seatNumber}
            className={`seat ${seats[seatNumber] ? 'booked' : ''} ${selectedSeats.includes(seatNumber) ? 'selected' : ''}`}
            onClick={() => handleSeatClick(seatNumber)}
          >
            {seatNumber}
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Book Now</button>
    </div>
  );
};

export default SeatSelection;
