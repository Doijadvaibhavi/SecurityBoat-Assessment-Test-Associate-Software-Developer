const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  showtimes: [String],
  seats: {
    type: Map,
    of: Boolean // True if seat is booked
  }
});

module.exports = mongoose.model('Movie', MovieSchema);
