const express = require('express');
const Booking = require('../models/Booking');
const Movie = require('../models/Movie');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/', async (req, res) => {
  const { userId, movieId, seats, showtime, token } = req.body;
  const amount = seats.length * 1000; // Example: $10 per seat
  try {
    const movie = await Movie.findById(movieId);
    for (const seat of seats) {
      if (movie.seats.get(seat)) {
        return res.status(400).send('Some seats are already booked');
      }
    }

    const charge = await stripe.charges.create({
      amount,
      currency: 'usd',
      source: token,
      description: `Booking for movie ${movie.title}`
    });

    for (const seat of seats) {
      movie.seats.set(seat, true);
    }
    await movie.save();

    const booking = new Booking({
      userId,
      movieId,
      seats,
      showtime,
      totalAmount: amount,
      paymentStatus: 'Paid'
    });
    await booking.save();
    res.status(201).send('Booking successful');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
