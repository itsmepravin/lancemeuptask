import clientPromise from "../../lib/mongoConnect";

import type { NextApiRequest, NextApiResponse } from "next";
import { WithId, Document } from "mongodb";

type RegisterRequest = {
  registerName: string;
  registerCountry: string;
  registerEmail: string;
  registerPassword: string;
};

type RegisterSuccessResponse = {
  success: boolean;
  user: WithId<Document>;
};

type RegisterFailResponse = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterSuccessResponse | RegisterFailResponse>
) {
  const {
    registerName,
    registerCountry,
    registerEmail,
    registerPassword,
  }: RegisterRequest = req.body;

  if (req.method !== "POST") {
    return res.status(500).json({
      success: false,
      message: "This route only accepts POST requests!",
    });
  }

  try {
    const client = await clientPromise;
    const db = client.db("lancemeup");

    await db.collection("users").insertOne({
      name: registerName,
      country: registerCountry,
      email: registerEmail,
      password: registerPassword,
      role: "NORMAL",
    });

    const user = await db
      .collection("users")
      .find({ email: registerEmail })
      .toArray();

    res.status(201).json({
      success: true,
      user: user[0],
    });
  } catch (e) {
    console.error(e);
  }
}
