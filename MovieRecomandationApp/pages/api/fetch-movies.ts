import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { MovieProps } from "@/interfaces";

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

if (!RAPIDAPI_KEY) {
  console.warn("⚠️ RAPIDAPI_KEY is not set. Please check your .env.local file");
}

interface TitleChartRankingResponse {
  data: {
    titleChartRankings: {
      edges: {
        node: {
          item: {
            id: string;
            primaryImage?: { url: string };
            titleText?: { text: string };
            releaseYear?: { year: number };
          };
        };
      }[];
    };
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MovieProps[] | { error: string }>
) {
  try {
    // Cache header
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=59");

    const response = await axios.get<TitleChartRankingResponse>(
      "https://imdb232.p.rapidapi.com/api/title/get-chart-rankings",
      {
        params: { rankingsChartType: "TOP_250", limit: 50 },
        headers: {
          "x-rapidapi-key": RAPIDAPI_KEY || "",
          "x-rapidapi-host": "imdb232.p.rapidapi.com",
        },
      }
    );

    // 🔍 DEBUG — THIS IS THE IMPORTANT LINE
    console.log(
      "RAW API RESPONSE:",
      JSON.stringify(response.data, null, 2)
    );

    const edges =
      response.data?.data?.titleChartRankings?.edges ?? [];

    if (edges.length === 0) {
      console.log("⚠️ No edges returned from IMDb");
    }

    const movies: MovieProps[] = edges.map(({ node }) => ({
      id: node.item.id,
      posterImage: node.item.primaryImage?.url || "/placeholder.jpg",
      title: node.item.titleText?.text || "No title",
      releaseYear: node.item.releaseYear?.year?.toString() || "N/A",
    }));

    res.status(200).json(movies);
  } catch (error: any) {
    console.error(
      "Error fetching movies:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to fetch movies" });
  }
}









