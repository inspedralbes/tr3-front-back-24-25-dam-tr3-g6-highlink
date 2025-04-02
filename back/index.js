import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./models/index.js";
import userRoutes from "./routes/userRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import configRoutes from "./routes/configRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import dotenv from "dotenv";
import { spawn } from 'node:child_process';
import cors from "cors";
import { verifyTokenMiddleware } from "./token.js";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const statsService = {state: "stopped", process};

const app = express();
const PORT = process.env.NODE_PORT || 4000;

app.use(bodyParser.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/config", configRoutes);
app.use("/api/messages", messageRoutes);

app.get("/game", (req, res) => {
  const filePath = path.join(__dirname, "static", "HighLink-v0.1.zip");
  res.download(filePath, "HighLink-v0.1.zip", (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).send("Error sending file");
    }
  });
});
app.get("/on-off-stats",  (req, res) => {

  let messageToSend = "Stats running";

  if (statsService.state === "stopped") {
    console.log("Starting stats");
    startProcess(statsService);
    statsService.state = "running";
    console.log("Stats started");
  } else {
    console.log("Stopping stats");
    stopProcess(statsService);
    statsService.state = "stopped";
    console.log("Stats stopped");
    messageToSend = "Stats stopped";
  }
  
  res.send(statsService.state);
});

app.get("/state-stats", (req, res) => {
  res.send({state: statsService.state});
});

function startProcess(service) {
  const process = spawn('node', [`stats.js`]);

  service.process = process;

  process.stdout.on('data', data => {
    console.log("Stats log: ", data.toString());
  });

  process.stderr.on('data', data => {
    console.log("Stats error: ", data.toString());
  });

  process.on('close', code => {
    service.state = 'stopped';
    service.process = null;
  });
}

function stopProcess(service) {
  service.process.kill();
  service.process = null;
}

sequelize.sync().then(() => {
  console.log("Database synced");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});