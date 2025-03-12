import express from "express";
import { Game } from "../models/index.js";

const router = express.Router();

// Create Game
router.post("/", async (req, res) => {
  try {
    const game = await Game.create(req.body);
    res.json(game);
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
