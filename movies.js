const express = require('express');
const Movie = require('../models/Movie');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/', async (req, res) => {
  const { title, genre, showtimes } = req.body;
  const seats = {};
  for (let i = 1; i <= 60; i++) seats[i] = false;
  try {
    const movie = new Movie({ title, genre, showtimes, seats });
    await movie.save();
    res.status(201).send('Movie added');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
