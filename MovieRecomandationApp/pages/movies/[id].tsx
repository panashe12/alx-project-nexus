import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import { MovieProps } from "@/interfaces";

const MovieOverviewPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `/api/fetch-movie-overview?id=${id}`
        );
        setMovie(res.data.data.title);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const addToFavorites = () => {
    if (!movie) return;
    const saved = localStorage.getItem("favorites");
    const favorites = saved ? JSON.parse(saved) : [];
    // prevent duplicates
    if (!favorites.find((m: MovieProps) => m.id === movie.id)) {
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert("Added to favorites!");
    }
  };

    fetchMovie();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>Movie not found</p>;

  return (
    <div>
      <h1>{movie.titleText.text}</h1>

      {movie.primaryImage && (
        <img
          src={movie.primaryImage.url}
          alt={movie.titleText.text}
          width={300}
        />
      )}

      <p>{movie.plot?.plotText?.plainText}</p>

      <p>
        ⭐ {movie.ratingsSummary?.aggregateRating} (
        {movie.ratingsSummary?.voteCount} votes)
      </p>
    </div>
  );
};



export default MovieOverviewPage;

