const express = require("express");
const app = express();
const mongoose = require("mongoose");
const chats = require("./data/data");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require("./utils/expressError");
require("dotenv").config();

const port = process.env.PORT || 8080;

// Connect to MongoDB using Mongoose
const dbUrl = process.env.ATLASDB_URL;

async function main() {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected to DB");
  } catch (error) {
    console.error("Error connecting to DB:", error);
    process.exit(1); // Exit process on error
  }
}
main().catch((error) => console.log(error));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is Running");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`port listing ${port}`);
});
