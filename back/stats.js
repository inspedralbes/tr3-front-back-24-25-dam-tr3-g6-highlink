import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.NODE_STATS_PORT || 4001;

// Middleware
app.use(express.json());
app.use(cors());


// Connect to MongoDB
mongoose.connect(process.env.NODE_MONGODB_URI);

const statSchema = new mongoose.Schema({
    game_id: { type: Number, required: true },
    height: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
});

// Create a Mongoose model
const Stat = mongoose.model('Stat', statSchema);

// Serve images for the frontend
app.use('/images', express.static(path.join('/app/images')));

// Create Stat
app.post("/", async (req, res) => {
    console.log(req.query);
    try {
        const { game_id, height } = req.query;

        if (!game_id || !height) {
            return res.status(400).json({ error: "Missing required query parameters: game_id and height" });
        }

        const parsedGameId = parseInt(game_id, 10);
        const parsedHeight = parseFloat(height, 10);

        const stat = new Stat({ game_id: parsedGameId, height: parsedHeight });
        await stat.save();

        res.json({ message: "Stat created" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// Get Stats by ID
app.get("/:id", async (req, res) => {

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

app.post("/createinfo", async (req, res) => {
    try {
        let value = 0;
        for (let i = 0; i < 100; i++) {
            const randomNum = Math.floor(Math.random() * 7) - 2;
            value = Math.max(0, value + randomNum);

            const d100 = Math.floor(Math.random() * 100) + 1;
            if (d100 == 1) {
                value = 0;
            }

            const stat = new Stat({ game_id: 100, height: value });
            await stat.save();
        }
        res.json({ message: "100 stats created" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete("/clearinfo", async (req, res) => {
    try {
        await Stat.deleteMany({ game_id: 100 });
        res.json({ message: "All stats with game_id 100 deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`MicroService running on port ${port}`);
});