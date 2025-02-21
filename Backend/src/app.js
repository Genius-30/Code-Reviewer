import aiRoutes from "./routes/ai.routes.js";
import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/api/ai", aiRoutes);

export default app;
