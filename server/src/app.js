import express from "express";
import cors from "cors";

import queueRoutes from "./routes/queue.routes.js";
import authRoutes from "./routes/auth.routes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/queue", queueRoutes);
app.use("/api/auth", authRoutes);

export default app;