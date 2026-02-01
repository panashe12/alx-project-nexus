import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { query } = req.body;

  const apiKey = process.env.MOVIE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing MOVIE_API_KEY" });
  }

  try {
    const response = await fetch(
      `https://imdb232.p.rapidapi.com/api/search?count=25&type=MOVIE&q=${encodeURIComponent(
        query
      )}`,
      {
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": "imdb232.p.rapidapi.com",
        },
      }
    );

    const data = await response.json();

    const edges = data?.data?.search?.edges || [];

    const movies = edges.map((edge: any) => {
      const node = edge.node;

      return {
        id: node.id,
        title: node.titleText?.text || "Unknown title",
        year: node.releaseYear?.year || null,
        image: node.primaryImage?.url || null,
        rating: null, // IMDb232 search does not return ratings here
        description: "",
      };
    });

    return res.status(200).json({ movies });
  } catch (error) {
    console.error("IMDb API error:", error);
    return res.status(500).json({ error: "Failed to fetch movies" });
  }
}









