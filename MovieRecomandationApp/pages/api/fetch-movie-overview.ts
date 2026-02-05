import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Movie ID is required" });
  }

  try {
    const response = await axios.get(
      "https://imdb232.p.rapidapi.com/api/title/get-overview",
      {
        params: { tt: id },
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
          "X-RapidAPI-Host": "imdb232.p.rapidapi.com",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error("IMDb API error:", error?.response?.data || error.message);

    res.status(500).json({
      error: "Failed to fetch movie overview",
    });
  }
}
