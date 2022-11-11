import clientPromise from "../../lib/mongoConnect";

export default async function handler(req, res) {
  const { registerName, registerCountry, registerEmail, registerPassword } =
    req.body;

  if (req.method !== "POST") {
    return res.status(500).json({
      msg: "This route only accepts POST requests!",
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
