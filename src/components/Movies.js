import React, { useState } from "react";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

function Movies() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');

    const [loading, setLoading] = useState(false);

    const searchMovies = async () => {
        if (!query.trim()) return;
        setLoading(true);
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
            );
            if (!response.ok) {
                throw new Error(`TMDB API error: ${response.status}`);
            }
            const data = await response.json();
            if (data.results.length === 0) {
                setError('No movies were found. ');
                setMovies([]);
            } else {
                setMovies(data.results);
                setError('');
                setQuery('');
            }
        } catch (err) {
            console.error(err);
            setError('Something went wrong. Please try again. ');
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') searchMovies();
    };

    return(
        <div style={{ textAlign: 'center'}}>
            <h2>Movies</h2>
            <div className="movies-search">
                <input
                type="text"
                placeholder="Search for a movie..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button onClick={searchMovies} disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
            </button>
            </div>

            {error && <p>{error}</p>}

            <div style={{ display : 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '20px', justifyContent: 'center'}}>
                {movies.map((movie) => (
                    <div key={movie.id} style={{ width: '160px' }}>
                        {movie.poster_path ? (
                            <img
                                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                alt={movie.title}
                                style={{width: '100%', borderRadius: '8px' }}
                            />
                        ) : (
                            <div style={{ width: '160px', height: '240px', background: '#333', borderRadius: '8px' }} />
                            )}
                            <p style={{ fontWeight: 'bold', margin: '6px 0 2px'}}>{movie.title}</p>
                            <p style={{ fontSize: '12px', color: '#aaa' }}>
                                {movie.overview ? movie.overview.substring(0, 100) + '...' : 'No description available. '}
                            </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Movies;