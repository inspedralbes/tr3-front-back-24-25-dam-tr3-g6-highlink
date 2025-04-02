import express from "express";
import { Message } from "../models/index.js";

const router = express.Router();

// Create Message
router.post("/", async (req, res) => {
    try {
        const message = await Message.create(req.body);
        res.json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Messages
router.get("/", async (req, res) => {
    const messages = await Message.findAll();
    res.json(messages);
});

// Delete Message
router.delete("/:id", async (req, res) => {
    const message = await Message.findByPk(req.params.id);
    if (message) {
        await message.destroy();
        res.json({ message: "Message deleted" });
    } else res.status(404).json({ error: "Message not found" });
});

export default router;