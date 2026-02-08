import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { q } = req.query;

  if (!q || typeof q !== "string") {
    return res.status(400).json({ message: "Missing search query" });
  }

  try {
    const response = await axios.get(
      "https://imdb232.p.rapidapi.com/api/search",
      {
        params: {
          q,
          count: 25,
          type: "MOVIE",
        },
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY as string,
          "x-rapidapi-host": "imdb232.p.rapidapi.com",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error("IMDb search error:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to search movies" });
  }
}
