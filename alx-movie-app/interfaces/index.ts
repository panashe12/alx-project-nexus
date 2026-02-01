export interface ComponentProps {
  children: React.ReactNode;
}

export interface ButtonProps {
  title: string;
  action?: () => void;
}

export interface MoviesProps {
  id: string;             // IMDb movie id
  title: string;          // Movie title
  image?: string | null;  // Poster image URL
  year?: number | null;   // Release year
  rating?: number | null; // Optional
  description?: string;   // Optional
}

/**
 * MovieCard props
 */
export interface MovieProps {
  title: string;
  posterImage: string;
  releaseYear: string;
}



