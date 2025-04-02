import express from "express";
import { Game } from "../models/index.js";

const router = express.Router();

// Create Game
router.post("/", async (req, res) => {
  try {
    console.log("Creating a game");
    const game = await Game.create(req.body);
    res.json({ id: game.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Games
router.get("/", async (req, res) => {
  const games = await Game.findAll();
  res.json(games);
});

// Get Game by ID
router.get("/:id", async (req, res) => {
  const game = await Game.findByPk(req.params.id);
  if (game) res.json(game);
  else res.status(404).json({ error: "Game not found" });
});

// Get Games by Player ID
router.get("/user/:id", async (req, res) => {
  try {
    const games = await Game.findAll({ where: { player_1: req.params.id } });
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Game
router.put("/:id", async (req, res) => {
  try {
    const game = await Game.findByPk(req.params.id);
    if (game) {
      await game.update(req.body);
      res.json(game);
    } else res.status(404).json({ error: "Game not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Game
router.delete("/:id", async (req, res) => {
  const game = await Game.findByPk(req.params.id);
  if (game) {
    await game.destroy();
    res.json({ message: "Game deleted" });
  } else res.status(404).json({ error: "Game not found" });
});

export default router;
