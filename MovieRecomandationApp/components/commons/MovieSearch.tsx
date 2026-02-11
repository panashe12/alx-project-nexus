import { useState } from "react";

interface MovieSearchProps {
  onResults: (movies: any[]) => void;
}

const MovieSearch: React.FC<MovieSearchProps> = ({ onResults }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/search-movies?q=${query}`);
      const data = await res.json();

      // IMDb results live here:
      const results =
        data?.data?.mainSearch?.edges?.map((edge: any) => edge.node.entity) ||
        [];

      onResults(results);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border px-4 py-2 rounded w-full"
      />

      <button
        onClick={handleSearch}
        disabled={loading}
        className="bg-[#da7227] text-white px-6 py-2 rounded hover:bg-[#d77d41] transition"
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
};

export default MovieSearch;
