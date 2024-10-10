const express = require("express");
const cors = require("cors"); // Import CORS
const connectDB = require("./database/mongodb");
const routes = require("./routes/index.routes"); // Import routes

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Chỉ cho phép từ nguồn này
  })
);

app.use(express.json());
connectDB();
app.use("/api", routes);

// Khởi động server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
