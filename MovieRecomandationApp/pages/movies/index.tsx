// File: /pages/movies/index.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import MovieCard from "@/components/commons/MovieCard";
import { MovieProps } from "@/interfaces";

const MoviesPage: React.FC = () => {
  // State to hold the list of movies
  const [movies, setMovies] = useState<MovieProps[]>([]);
  // State to hold the search query
  const [query, setQuery] = useState<string>("");

  /**
   * Fetch movies from the API
   * @param searchQuery optional search string for filtering movies
   * @returns flattened array of movies
   */
  const fetchMovies = async (searchQuery: string = ""): Promise<MovieProps[]> => {
    try {
      // Call our Next.js API
      const response = await axios.get(
        `/api/fetch-movies${searchQuery ? `?q=${searchQuery}` : ""}`
      );
      const data = response.data;

      // Flatten edges into an array of movie items
      // IMDb API response has structure: data.titleChartRankings.edges[].node.item
      const movieList = data.data?.titleChartRankings?.edges?.map(
        (edge: any) => edge.node.item
      ) || [];

      console.log("Mapped Movies Data:", movieList); // Debug: check the flattened array
      return movieList;
    } catch (error) {
      console.error("Error fetching movies:", error);
      return []; // Fallback to empty array if API fails
    }
  };

  // Load top movies on first render
  useEffect(() => {
    // Check if cached data exists in localStorage to reduce API calls
    const cached = localStorage.getItem("moviesCache");
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed.length > 0) {
        setMovies(parsed);
        return; // use cached data
      }
    }

    // Fetch top movies from API if cache is empty
    fetchMovies().then((data) => {
      // Store fetched movies in localStorage for future use
      localStorage.setItem("moviesCache", JSON.stringify(data));
      setMovies(data);
    });
  }, []);

  /**
   * Handle search button click
   * Fetch movies based on the search query
   */
  const handleSearch = async () => {
    const data = await fetchMovies(query);
    setMovies(data);
    localStorage.setItem("moviesCache", JSON.stringify(data)); // update cache
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

      {/* Movies grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Show message if no movies */}
        {movies.length === 0 ? (
          <p>No movies found.</p>
        ) : (
          movies.map((movie: any) => {
            // Skip invalid movies without an ID
            if (!movie?.id) return null;

            return (
              <Link href={`/movies/${movie.id}`} key={movie.id}>
                <MovieCard
                  id={movie.id}
                  // Use titleText.text or fallback to originalTitleText.text
                  title={movie.titleText?.text || movie.originalTitleText?.text || "Untitled"}
                  // Poster image or placeholder if missing
                  posterImage={movie.primaryImage?.url || "/placeholder.jpg"}
                  // Release year or N/A
                  releaseYear={movie.releaseYear?.year || "N/A"}
                />
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MoviesPage;













