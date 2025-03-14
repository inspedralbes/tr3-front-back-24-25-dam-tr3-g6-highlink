import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./models/index.js";
import userRoutes from "./routes/userRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import configRoutes from "./routes/configRoutes.js";
import dotenv from "dotenv";
import { spawn } from 'node:child_process';

dotenv.config();

const statsService = {state: "stopped", process};

const app = express();
const PORT = process.env.NODE_PORT || 4000;

app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/config", configRoutes);

// app.use("/uploads", express.static("uploads"));

app.use("/start-stats", (req, res) => {

  let messageToSend = "Stats running";

  if (statsService.state === "stopped") {
    console.log("Starting stats");
    startProcess(statsService);
    statsService.state = "running";
  } else {
    console.log("Stopping stats");
    stopProcess(statsService);
    statsService.state = "stopped";
    messageToSend = "Stats stopped";
  }
  
  res.send(messageToSend);
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