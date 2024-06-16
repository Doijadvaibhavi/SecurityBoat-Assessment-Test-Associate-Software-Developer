const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  seats: [String],
  showtime: String,
  totalAmount: Number,
  paymentStatus: String
});

module.exports = mongoose.model('Booking', BookingSchema);
