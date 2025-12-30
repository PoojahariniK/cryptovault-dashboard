require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const assetRoutes = require("./routes/asset.routes");
const profileRoutes = require("./routes/profile.routes");
const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(cookieParser());

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/profile", profileRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
