import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="movie-container">
      <h1 className="movie-heading" onClick={toggleDropdown}>Movies From Database</h1>
      {isOpen && (
        <ul className="movie-list">
          {movies.map(movie => (
            <li key={movie.id} className="movie-item">
              <div className="movie-title">
                <strong>Title:</strong> {movie.title}
              </div>
              <div className="movie-director">
                <strong>Director:</strong> {movie.director}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MovieList;





