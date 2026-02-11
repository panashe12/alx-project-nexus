// File: /pages/favorites/index.tsx
import { useEffect, useState } from "react";
import MovieCard from "@/components/commons/MovieCard";
import { NormalizedMovie } from "@/interfaces";


const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<NormalizedMovie[]>([]);

  // -----------------------------
  // Load favorites from localStorage on mount
  // -----------------------------
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (!saved) return;

    const parsed = JSON.parse(saved);

    // Normalize favorites for safe rendering
    const normalized: NormalizedMovie[] = parsed.map((movie: any) => ({
      id: movie.id,
      title:
        movie.title || // already normalized
        movie.titleText?.text ||
        movie.originalTitleText?.text ||
        "Untitled",
      releaseYear:
        movie.releaseYear?.year
          ? String(movie.releaseYear.year)
          : movie.releaseYear || // already normalized
            "N/A",
      posterImage:
        movie.posterImage || // already normalized
        movie.primaryImage?.url ||
        "/placeholder.jpg",
      genres:
        movie.genres || // already normalized
        movie.titleGenres?.genres
          ?.map((g: any) => g.genre?.text)
          .join(", ") ||
        "N/A",
    }));

    setFavorites(normalized);
  }, []);

  // -----------------------------
  // Update favorites after removing a movie
  // -----------------------------
  const handleUpdate = () => {
    const saved = localStorage.getItem("favorites");
    if (!saved) {
      setFavorites([]);
      return;
    }

    const parsed = JSON.parse(saved);

    const normalized: NormalizedMovie[] = parsed.map((movie: any) => ({
      id: movie.id,
      title:
        movie.title ||
        movie.titleText?.text ||
        movie.originalTitleText?.text ||
        "Untitled",
      releaseYear:
        movie.releaseYear?.year
          ? String(movie.releaseYear.year)
          : movie.releaseYear ||
            "N/A",
      posterImage:
        movie.posterImage || movie.primaryImage?.url || "/placeholder.jpg",
      genres:
        movie.genres ||
        movie.titleGenres?.genres?.map((g: any) => g.genre?.text).join(", ") ||
        "N/A",
    }));

    setFavorites(normalized);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Your Favorite Movies</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-400">You haven't added any favorites yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterImage={movie.posterImage}
              releaseYear={movie.releaseYear}
              genres={movie.genres}
              onFavoriteChange={handleUpdate} // callback for unfavorite
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;


