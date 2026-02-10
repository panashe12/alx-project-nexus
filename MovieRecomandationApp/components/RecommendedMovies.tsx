import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface RecommendedMoviesProps {
  movieId: string;
}

const RecommendedMovies = ({ movieId }: RecommendedMoviesProps) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchRecommendations = async () => {
      try {
        const idsRes = await axios.get(
          `/api/fetch-more-like-this?id=${movieId}`
        );

        const ids: string[] = idsRes.data;

        const movieRequests = ids.slice(0, 12).map((id) =>
          axios.get(`/api/fetch-movie-overview?id=${id}`)
        );

        const moviesRes = await Promise.all(movieRequests);

        const results = moviesRes.map((res) => res.data.data.title);
        setMovies(results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [movieId]);

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  if (loading) {
    return <p className="text-gray-500">Loading recommendations...</p>;
  }

  if (!movies.length) return null;

  return (
    <section className="mt-10 relative">
      <h2 className="text-2xl font-semibold mb-4">More Like This</h2>

      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-gray-700"
      >
        ◀
      </button>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-gray-700"
      >
        ▶
      </button>

      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-hidden scroll-smooth px-12"
      >
        {movies.map((movie) => (
          <Link
            key={movie.id}
            href={`/movies/${movie.id}`}
            className="min-w-[160px] bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-transform"
          >
            {movie.primaryImage?.url ? (
              <img
                src={movie.primaryImage.url}
                alt={movie.titleText.text}
                className="w-full h-56 object-cover"
              />
            ) : (
              <div className="w-full h-56 bg-gray-700 flex items-center justify-center text-sm text-gray-300">
                No Image
              </div>
            )}

            <div className="p-2">
              <p className="font-semibold text-sm text-white line-clamp-2">
                {movie.titleText.text}
              </p>
              {movie.releaseYear?.year && (
                <p className="text-xs text-gray-400">
                  {movie.releaseYear.year}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecommendedMovies;
