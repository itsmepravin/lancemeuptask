import clientPromise from "../../lib/mongoConnect";

export default async function handler(req, res) {
  const { loginEmail, loginPassword } = req.body;

  if (req.method !== "POST") {
    return res.status(500).json({
      msg: "This route only accepts POST requests!",
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
