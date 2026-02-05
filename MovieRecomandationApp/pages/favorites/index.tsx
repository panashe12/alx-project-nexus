import { useEffect, useState } from "react";
import MovieCard from "@/components/commons/MovieCard";
import { MovieProps } from "@/interfaces";

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<MovieProps[]>([]);

  // -----------------------------
  // Load favorites from localStorage on mount
  // -----------------------------
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // -----------------------------
  // Update state after removing a favorite
  // -----------------------------
  const handleUpdate = () => {
    const saved = localStorage.getItem("favorites");
    setFavorites(saved ? JSON.parse(saved) : []);
  };

  return (
    <div className="min-h-screen bg-[#12122B] text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Your Favorite Movies</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-400">You haven't added any favorites yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favorites.map((movie) => (
            // Pass a key and a special prop so MovieCard can update favorites
            <MovieCard
              key={movie.id}
              {...movie}
              onFavoriteChange={handleUpdate} // optional callback
            />
          ))}
        </div>
      )}
    </div>
  );
};


export default FavoritesPage;
