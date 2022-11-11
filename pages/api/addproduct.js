import clientPromise from "../../lib/mongoConnect";

export default async function handler(req, res) {
  const { title, price, category, description, image } = req.body;

  if (req.method !== "POST") {
    return res.status(500).json({
      msg: "This route only accepts POST requests!",
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
