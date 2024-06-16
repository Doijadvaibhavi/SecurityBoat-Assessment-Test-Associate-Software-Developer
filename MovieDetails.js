import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await axios.get(`/api/movies/${id}`);
      setMovie(response.data);
    };
    fetchMovie();
  }, [id]);

  return (
    movie ? (
      <div>
        <h1>{movie.title}</h1>
        <p>{movie.genre}</p>
        <p>Showtimes: {movie.showtimes.join(', ')}</p>
        {/* Add SeatSelection and Checkout components here */}
      </div>
    ) : (
      <p>Loading...</p>
    )
  );
};

export default MovieDetails;
