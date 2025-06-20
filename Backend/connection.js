const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://archana-in-db:archana@cluster0.s6vsytd.mongodb.net/blogDB?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error.message);
  });
