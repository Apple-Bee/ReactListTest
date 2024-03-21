import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:5103/api/movies');
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  return (
    <div>
      <h1>Movies</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <div>
              <strong>Title:</strong> {movie.title}
            </div>
            <div>
              <strong>Director:</strong> {movie.director}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;




