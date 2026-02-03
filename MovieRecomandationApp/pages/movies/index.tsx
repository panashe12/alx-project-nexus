// File: /pages/movies/index.tsx

// pages/movies/index.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import { MovieProps } from "@/interfaces";

const MoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [query, setQuery] = useState<string>("");

  // Fetch movies from API and return data
  const fetchMovies = async (searchQuery: string = ""): Promise<MovieProps[]> => {
    try {
      const response = await axios.get<MovieProps[]>(
        `/api/fetchmovies${searchQuery ? `?q=${searchQuery}` : ""}`
      );
      console.log("Mapped Movies Data:", response.data);
      return response.data; // RETURN the data
    } catch (error) {
      console.error("Error fetching movies:", error);
      return []; // return empty array on error
    }
  };

  // Load top movies automatically with caching
  useEffect(() => {
  const cached = localStorage.getItem("moviesCache");

  if (cached) {
    const parsed = JSON.parse(cached);
    if (parsed.length > 0) {
      setMovies(parsed);
      return;
    }
  }

  fetchMovies().then((data) => {
    localStorage.setItem("moviesCache", JSON.stringify(data));
    setMovies(data);
  });
}, []);


  // Handle search
  const handleSearch = async () => {
    const data = await fetchMovies(query);
    setMovies(data);
    localStorage.setItem("moviesCache", JSON.stringify(data));
  };

  return (
    <div className="p-4 text-white min-h-screen bg-black">
      {/* Search bar */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-2 rounded bg-gray-800 text-white outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
        >
          Search
        </button>
      </div>

      {/* Movies list */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.length === 0 ? (
          <p>No movies found.</p>
        ) : (
          movies.map((movie) => (
            <div key={movie.id} className="bg-gray-900 p-2 rounded">
              <img
                src={movie.posterImage}
                alt={movie.title}
                className="w-full h-auto rounded mb-2"
              />
              <h3 className="text-lg font-semibold">{movie.title}</h3>
              <p className="text-gray-400">{movie.releaseYear}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MoviesPage;









