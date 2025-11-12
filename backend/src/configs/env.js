import dotenv from "dotenv";
dotenv.config();
export const config = {
  port: process.env.PORT || 5001,
  nodeEnv: process.env.NODE_ENV || "development",
  db: {
    url: process.env.DATABASE_URL,
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
  },
  jwtSecret: process.env.JWT_SECRET || "defaultSecret",
};
