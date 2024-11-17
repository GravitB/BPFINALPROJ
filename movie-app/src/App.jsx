/*import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [movies, setMovies] = useState(null)

  useEffect(() => {
    fetch('http://www.omdbapi.com/?apikey=[c56e5fa6]&')
      .then(response => {
        console.log(response)
        response.json
      })
      .then(data => setMovies(data.results))
      .catch(error => console.error("Error fetching movies"))
  }, [])

  return (
    <>
        <h1>Movies</h1>
        { movies ? (
          <ul>
            { movies.map (movie => (
              <li key={movie.name}>
                <p>movie.year</p>
              </li>
            ))}
          </ul>
        ) : (
        )}
    </>
  )
}*/

import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = 'c56e5fa6';

  useEffect(() => {
    if (!searchQuery) return;

    setLoading(true);
    fetch(`https://www.omdbapi.com/?s=${searchQuery}&apikey=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.Response === 'True' ? data.Search : []);
        setError(data.Response === 'False' ? 'No movies found' : null);
      })
      .catch(() => setError('Error fetching data'))
      .finally(() => setLoading(false));
  }, [searchQuery]); // Fix: Attach dependency array properly

  return (
    <>
      <h1>Movie Search</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for a movie..."
      />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.imdbID}>
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}
              alt = {movie.Title}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
