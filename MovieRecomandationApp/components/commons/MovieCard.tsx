import { MovieProps } from "@/interfaces";
import Link from "next/link";
import { useEffect, useState } from "react";

const MovieCard: React.FC<MovieProps> = ({ id, title, posterImage, releaseYear }) => {
  // -----------------------------
  // STATE: is this movie a favorite?
  // -----------------------------
  const [isFavorite, setIsFavorite] = useState(false);

  // -----------------------------
  // On mount, check if this movie is already in localStorage favorites
  // -----------------------------
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      const favorites: MovieProps[] = JSON.parse(saved);
      setIsFavorite(favorites.some((m) => m.id === id));
    }
  }, [id]);

  // -----------------------------
  // Function to toggle favorite status
  // -----------------------------
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating when clicking the heart
    const saved = localStorage.getItem("favorites");
    let favorites: MovieProps[] = saved ? JSON.parse(saved) : [];

    if (isFavorite) {
      // Remove from favorites
      favorites = favorites.filter((m) => m.id !== id);
    } else {
      // Add to favorites
      favorites.push({ id, title, posterImage, releaseYear });
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <Link
      href={`/movies/${id}`}
      className="relative block rounded-lg overflow-hidden shadow-lg bg-[#1B1B2F] hover:scale-105 transform transition-all duration-300"
    >
      {/* -----------------------------
          Favorite Heart Icon (top-right corner)
          Click to add/remove from favorites
          ----------------------------- */}
      <button
        onClick={toggleFavorite}
        className="absolute top-2 right-2 z-10 text-white text-xl"
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      {/* Movie image */}
      <div className="w-full h-56 overflow-hidden">
        <img
          src={posterImage}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Movie info */}
      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-gray-400">{releaseYear}</p>
      </div>
    </Link>
  );
};

export default MovieCard;




