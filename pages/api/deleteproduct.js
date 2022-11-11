import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongoConnect";

export default async function handler(req, res) {
  const { _id } = req.body;

  try {
    const client = await clientPromise;
    const db = client.db("lancemeup");

    await db.collection("products").deleteOne({ _id: ObjectId(String(_id)) });

    return res.status(200).json({
      success: true,
      message: "Product Deleted Successfully!",
    });
  } catch (e) {
    console.error(e);
  }
}
