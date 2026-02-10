import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Missing movie id" });
  }

  try {
    const response = await axios.get(
      `https://imdb232.p.rapidapi.com/api/title/get-more-like-this?tt=${id}`,
      {
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
          "x-rapidapi-host": "imdb232.p.rapidapi.com",
        },
      }
    );

    const ids =
      response.data?.data?.title?.moreLikeThisTitles?.edges?.map(
        (edge: any) => edge.node.id
      ) || [];

    res.status(200).json(ids);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch recommendations" });
  }
}
