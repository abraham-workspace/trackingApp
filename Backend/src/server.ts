// server.ts
import { setupAliases } from "import-aliases";
setupAliases();
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authroute from "@app/routes/authroute";
import deviceRoute from "@app/routes/deviceRoute";


// Load environment variables first
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// CORS: Allow frontend & mobile network IPs
app.use(cors({
  origin: '*', // Allow requests from any origin
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));




// routes
app.use('/api/auth', authroute)
app.use('/api/device', deviceRoute)


// Root test route
app.get("/", (_req, res) => {
  res.send("TRACKER API is running...");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
