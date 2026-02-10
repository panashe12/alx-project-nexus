import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { MovieProps } from "@/interfaces";
import RecommendedMovies from "@/components/RecommendedMovies";


const MovieOverviewPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      try {
        const res = await axios.get(`/api/fetch-movie-overview?id=${id}`);
        setMovie(res.data.data.title);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const addToFavorites = () => {
    if (!movie) return;
    const saved = localStorage.getItem("favorites");
    const favorites = saved ? JSON.parse(saved) : [];
    if (!favorites.find((m: MovieProps) => m.id === movie.id)) {
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert("Added to favorites!");
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!movie) return <p className="text-center mt-10">Movie not found</p>;

  const runtimeHours = Math.floor(movie.runtime?.seconds / 3600);
  const runtimeMinutes = Math.floor((movie.runtime?.seconds % 3600) / 60);

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row gap-6">
        {movie.primaryImage && (
          <img
            src={movie.primaryImage.url}
            alt={movie.titleText.text}
            className="w-full md:w-1/3 rounded-lg shadow-lg object-cover"
          />
        )}
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold">
            {movie.titleText.text} ({movie.releaseYear?.year})
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {movie.titleType?.text} | {runtimeHours}h {runtimeMinutes}m |{" "}
            {movie.certificate?.rating}
          </p>
          <div className="mt-2 flex items-center gap-4 flex-wrap">
            <p>
              ⭐ {movie.ratingsSummary?.aggregateRating} (
              {movie.ratingsSummary?.voteCount} votes)
            </p>
            {movie.metacritic && (
              <p>
                🟢 {movie.metacritic.metascore.score} Metascore (
                {movie.metacritic.metascore.reviewCount} reviews)
              </p>
            )}
          </div>
          <button
            onClick={addToFavorites}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Add to Favorites
          </button>
        </div>
      </div>

      {/* Plot Section */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Plot</h2>
        <p className="text-gray-700">{movie.plot?.plotText?.plainText}</p>
      </section>

      {/* Genres / Subgenres */}
      {movie.genres?.edges?.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">Genres & Subgenres</h2>
          <p className="text-gray-700">
            <strong>Genres:</strong>{" "}
            {movie.genres.edges
              .filter((g: any) => g.node.genreType === "GENRE")
              .map((g: any) => g.node.text)
              .join(", ")}
          </p>
          <p className="text-gray-700">
            <strong>Subgenres:</strong>{" "}
            {movie.genres.edges
              .filter((g: any) => g.node.genreType === "SUBGENRE")
              .map((g: any) => g.node.text)
              .join(", ")}
          </p>
        </section>
      )}

      {/* Key Cast / Contributors with Arrow Carousel */}
      {movie.interests?.edges?.length > 0 && (
        <section className="mt-8 relative">
          <h2 className="text-2xl font-semibold mb-4">Key Cast / Contributors</h2>

          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-gray-700"
          >
            ◀
          </button>

          {/* Right Arrow */}
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
            {movie.interests.edges.flatMap((interest: any) =>
              interest.node.primaryImage?.names?.map((name: any) => (
                <div
                  key={name.id}
                  className="min-w-[140px] bg-gray-800 rounded-lg p-2 flex-shrink-0 flex flex-col items-center hover:scale-105 transition-transform"
                >
                  {name.primaryImage?.url && (
                    <img
                      src={name.primaryImage.url}
                      alt={name.nameText.text}
                      className="w-32 h-32 object-cover rounded-full mb-2"
                    />
                  )}
                  <h3 className="font-semibold text-white text-center">
                    {name.nameText.text}
                  </h3>
                  {name.akas?.edges?.length > 0 && (
                    <p className="text-orange-400 text-center text-sm">
                      aka {name.akas.edges[0].node.text}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </section>
      )}

      {/* Production Timeline */}
      {movie.productionStatus?.productionStatusHistory?.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Production Timeline</h2>
          <ul className="border-l-2 border-gray-300 ml-4">
            {movie.productionStatus.productionStatusHistory.map((stage: any) => (
              <li key={stage.date} className="mb-4 ml-4 relative">
                <div className="absolute -left-3 w-6 h-6 bg-blue-600 rounded-full border-2 border-white"></div>
                <p className="font-semibold">{stage.status.text}</p>
                {stage.date && (
                  <p className="text-gray-500 text-sm">
                    {new Date(stage.date).toLocaleDateString()}
                  </p>
                )}
                {stage.comment?.text && (
                  <p className="text-gray-600 text-sm">{stage.comment.text}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Engagement & Stats */}
      <section className="mt-8 flex flex-wrap gap-6">
        {movie.engagementStatistics?.watchlistStatistics && (
          <p>📌 {movie.engagementStatistics.watchlistStatistics.displayableCount.text}</p>
        )}
        {movie.reviews && <p>📝 {movie.reviews.total} Reviews</p>}
        {movie.externalLinks && <p>🔗 {movie.externalLinks.total} External Links</p>}
      </section>
      
      {movie?.id && <RecommendedMovies movieId={movie.id} />}

    </div>
  );
};

export default MovieOverviewPage;





