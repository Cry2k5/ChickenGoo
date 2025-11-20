import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import routerUser from "./routes/user.route.js";
import routerAdmin from "./routes/admin.route.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes

// Admin routes (gọi chung routerAdmin)
app.use("/api/admin", routerAdmin);

// User routes (gọi chung routerUser)
app.use("/api/user", routerUser);

// Root
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
