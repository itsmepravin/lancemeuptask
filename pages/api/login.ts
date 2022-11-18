import clientPromise from "../../lib/mongoConnect";

import type { NextApiRequest, NextApiResponse } from "next";
import { WithId, Document } from "mongodb";

type LoginRequest = {
  loginEmail: string;
  loginPassword: string;
};

type LoginSuccessResponse = {
  success: boolean;
  user: WithId<Document>;
};

type LoginFailResponse = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginSuccessResponse | LoginFailResponse>
) {
  const { loginEmail, loginPassword }: LoginRequest = req.body;

  if (req.method !== "POST") {
    return res.status(500).json({
      success: false,
      message: "This route only accepts POST requests!",
    });
  }

  try {
    const client = await clientPromise;
    const db = client.db("lancemeup");

    const response = await db
      .collection("users")
      .find({ email: loginEmail })
      .toArray();

    const user = response[0];

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found!",
      });
    }

    if (loginPassword !== user.password) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password",
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (e) {
    console.error(e);
  }
}
