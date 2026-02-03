import { MovieProps } from "@/interfaces";

const MovieCard: React.FC<MovieProps> = ({ title, posterImage, releaseYear }) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-[#1B1B2F]">
      <img
        src={posterImage}
        alt={title}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-gray-400">{releaseYear}</p>
      </div>
    </div>
  );
};

export default MovieCard;
