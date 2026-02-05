// pages/api/fetch-movies.ts
import type { NextApiRequest, NextApiResponse } from "next";
import https from "https";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const options = {
    method: "GET",
    hostname: "imdb232.p.rapidapi.com",
    port: null,
    path: "/api/title/get-chart-rankings?rankingsChartType=TOP_250&limit=20",
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
      "x-rapidapi-host": "imdb232.p.rapidapi.com",
    },
  };

  const request = https.request(options, function (response) {
    const chunks: Uint8Array[] = [];

    response.on("data", function (chunk) {
      chunks.push(chunk);
    });

    response.on("end", function () {
      try {
        const body = Buffer.concat(chunks).toString();
        const data = JSON.parse(body); // parse string to JSON
        res.status(200).json(data); // ✅ return to frontend
      } catch (err) {
        console.error("Error parsing JSON:", err);
        res.status(500).json({ error: "Failed to parse API response" });
      }
    });
  });

  request.on("error", (err) => {
    console.error("Request error:", err);
    res.status(500).json({ error: "Request failed" });
  });

  request.end();
}


























