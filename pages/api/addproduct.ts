import clientPromise from "../../lib/mongoConnect";

import type { NextApiRequest, NextApiResponse } from "next";

type Response = {
  success: boolean;
  message: string;
};

type Request = {
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { title, price, category, description, image }: Request = req.body;

  if (req.method !== "POST") {
    return res.status(500).json({
      success: false,
      message: "This route only accepts POST requests!",
    });
  }

  if (!title || !price || !category || !description || !image)
    return res.status(404).json({
      success: false,
      message: "Please provide all the fields!",
    });

  try {
    const client = await clientPromise;
    const db = client.db("lancemeup");

    const totalDocuments = await db.collection("products").countDocuments({});

    const response = await db.collection("products").insertOne({
      title,
      price,
      category,
      description,
      image,
      id: totalDocuments + Math.floor(Math.random() * 100),
      rating: {
        rate: 0,
        count: 0,
      },
    });

    if (!response.acknowledged) {
      return res.status(404).json({
        success: false,
        message: "Error adding product, please try again later!",
      });
    } else {
      return res.status(201).json({
        success: true,
        message: "Added new product successfully!",
      });
    }
  } catch (e) {
    console.error(e);
  }
}
