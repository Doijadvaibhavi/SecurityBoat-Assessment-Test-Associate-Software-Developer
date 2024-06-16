const express = require('express');
const Movie = require('../models/Movie');
const router = express.Router();

router.post('/lock', async (req, res) => {
  const { movieId, seatNumbers } = req.body;
  try {
    const movie = await Movie.findById(movieId);
    for (const seat of seatNumbers) {
      if (movie.seats.get(seat)) {
        return res.status(400).send('Some seats are already booked');
      }
      movie.seats.set(seat, true);
    }
    await movie.save();
    res.send('Seats locked');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/release', async (req, res) => {
  const { movieId, seatNumbers } = req.body;
  try {
    const movie = await Movie.findById(movieId);
    for (const seat of seatNumbers) {
      movie.seats.set(seat, false);
    }
    await movie.save();
    res.send('Seats released');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
