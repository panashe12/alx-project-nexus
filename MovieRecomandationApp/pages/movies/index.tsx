// File: /pages/movies/index.tsx

// File: /pages/movies/index.tsx

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import MovieCard from "@/components/commons/MovieCard";
import MovieSearch from "@/components/commons/MovieSearch";
import { MovieProps } from "@/interfaces";

const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

const MoviesPage: React.FC = () => {
  // State to hold the list of movies displayed in the grid
  const [movies, setMovies] = useState<MovieProps[]>([]);

  // State to track whether we are showing search results
  const [isSearching, setIsSearching] = useState(false);

  /**
   * Fetch top movies from the API
   * @returns flattened array of movies
   */
  const fetchMovies = async (): Promise<MovieProps[]> => {
    try {
      const response = await axios.get("/api/fetch-movies");
      const data = response.data;

      // Flatten edges into an array of movie items
      const movieList =
        data.data?.titleChartRankings?.edges?.map(
          (edge: any) => edge.node.item
        ) || [];

      console.log("Mapped Movies Data:", movieList);
      return movieList;
    } catch (error) {
      console.error("Error fetching movies:", error);
      return [];
    }
  };

  /**
   * Load top movies on first render (with cache + expiry)
   */
  useEffect(() => {
    const cached = localStorage.getItem("moviesCache");

    if (cached) {
      const parsed = JSON.parse(cached);
      const isValid =
        Date.now() - parsed.timestamp < CACHE_DURATION;

      if (isValid && parsed.data?.length > 0) {
        setMovies(parsed.data);
        return;
      }
    }

    fetchMovies().then((data) => {
      localStorage.setItem(
        "moviesCache",
        JSON.stringify({
          timestamp: Date.now(),
          data,
        })
      );
      setMovies(data);
    });
  }, []);

  return (
    <div className="p-4 text-white min-h-screen bg-black">
      {/* Reusable search bar (no caching here) */}
      <MovieSearch onResults={(results) => {
        setIsSearching(true);
        setMovies(results);
      }} />

      {/* Movies grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.length === 0 ? (
          <p>{isSearching ? "No search results found." : "Loading movies..."}</p>
        ) : (
          movies.map((movie: any) => {
            if (!movie?.id) return null;

            return (
              <Link href={`/movies/${movie.id}`} key={movie.id}>
                <MovieCard
                  id={movie.id}
                  title={
                    movie.titleText?.text ||
                    movie.originalTitleText?.text ||
                    "Untitled"
                  }
                  posterImage={
                    movie.primaryImage?.url || "/placeholder.jpg"
                  }
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
















