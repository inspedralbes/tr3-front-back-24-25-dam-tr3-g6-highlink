import express from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose';

dotenv.config();

const router = express.Router();

// Connect to MongoDB
mongoose.connect(process.env.NODE_MONGODB_URI);

const statSchema = new mongoose.Schema({
  game_id: { type: Number, required: true },
  height: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

// Create a Mongoose model
const Stat = mongoose.model('Stat', statSchema);

// Create Stat
router.post("/", async (req, res) => {
  try {
    const { game_id, height } = req.body.content;

    const stat = new Stat({ game_id, height });
    await stat.save();

    res.json({message: "Stat created"});
    

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Stats by ID
router.get("/:id", async (req, res) => {

  console.log(`${process.env.NODE_PYTHON_URI}/run-script/${req.params.id}`);
  
  try {
    console.log(`${process.env.NODE_PYTHON_URI}/run-script/${req.params.id}`);
    
    const response = await fetch(`${process.env.NODE_PYTHON_URI}/run-script/${req.params.id}`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`Fetch failed with status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
