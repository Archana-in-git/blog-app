const express = require("express");
const cors = require("cors");
const BlogModel = require("./model"); // ✅ Import BlogModel
require("./connection"); // ✅ Initialize DB connection

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

// ✅ ADD blog
app.post("/add", async (req, res) => {
  try {
    const data = new BlogModel(req.body);
    await data.save();
    res.json({ message: "Blog added successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// ✅ GET all blogs
app.get("/", async (req, res) => {
  try {
    let data = await BlogModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching blogs");
  }
});

// ✅ DELETE blog
app.delete("/delete/:id", async (req, res) => {
  try {
    await BlogModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting blog");
  }
});

// ✅ UPDATE blog
app.put("/update/:id", async (req, res) => {
  try {
    const updatedBlog = await BlogModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated document
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({ message: "Blog updated successfully!" });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Update failed" });
  }
});

app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});
