import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const configFilePath = path.join(__dirname, 'config.json');

// GET route to return the config file content
router.get('/', (req, res) => {
    fs.readFile(configFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read config file' });
        }
        console.log(JSON.parse(data));
        res.json(JSON.parse(data));
    });
});

// POST route to overwrite the current JSON with the new one
router.post('/', (req, res) => {
    const newConfig = req.body;

    fs.writeFile(configFilePath, JSON.stringify(newConfig, null, 2), 'utf8', (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to write config file' });
        }
        res.status(200).json({ message: 'Config file updated successfully' });
    });
});

export default router;