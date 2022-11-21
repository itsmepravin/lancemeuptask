import clientPromise from "../../lib/mongoConnect";

import type { NextApiRequest, NextApiResponse } from "next";

import type { ProductItem } from "../../context/AppContext";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db("lancemeup");

    const response = await db.collection("products").find({}).toArray();
    const products = response.reverse() as ProductItem[];
    console.log(products);

    return res.status(200).json({
      products,
    });
  } catch (e) {
    console.error(e);
  }
}
