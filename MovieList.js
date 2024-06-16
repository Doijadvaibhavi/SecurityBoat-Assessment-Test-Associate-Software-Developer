import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get('/api/movies');
      setMovies(response.data);
    };
    fetchMovies();
  }, []);

  return (
    <div>
      {movies.map(movie => (
        <div key={movie._id}>
          <h2>{movie.title}</h2>
          <p>{movie.genre}</p>
          <p>Showtimes: {movie.showtimes.join(', ')}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
