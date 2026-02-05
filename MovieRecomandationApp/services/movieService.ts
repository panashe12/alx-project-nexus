import axios from "axios";
import { MovieProps } from "@/interfaces";

export const getTopMovies = async (query?: string): Promise<MovieProps[]> => {
  try {
    // Call your existing API route
    const response = await axios.get<MovieProps[]>("/api/fetchmovies", {
      params: query ? { q: query } : {},
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching movies:", error.message);
    return [];
  }
};