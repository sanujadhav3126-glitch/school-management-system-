require('dotenv').config();  // 👈 हे TOP ला असायलाच पाहिजे

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Routes
const Routes = require("./routes/route.js");
const reportRoutes = require("./routes/reportRoutes");

// PORT
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '10mb' }));

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.log("❌ NOT CONNECTED TO DATABASE", err);
  });

// Routes
app.use('/api', Routes);
app.use('/api/reports', reportRoutes);

// Server Start
app.listen(PORT, () => {
  console.log(` Server started at port ${PORT}`);
});