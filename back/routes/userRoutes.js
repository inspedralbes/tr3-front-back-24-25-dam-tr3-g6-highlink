import express from "express";
import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

const uploadDir = "uploads";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir); // Save files in "uploads" folder
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `user-${Date.now()}${ext}`);
    },
  });
  
  const upload = multer({ storage });

// Create User
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/:id/upload", upload.single("image"), async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });
  
      // Save file path in DB
      user.skin_path = `/uploads/${req.file.filename}`;
      await user.save();
  
      res.json({ message: "Image uploaded", path: user.skin_path });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Get All Users
router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// Get User by ID
router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) res.json(user);
  else res.status(404).json({ error: "User not found" });
});

// Update User
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.update(req.body);
      res.json(user);
    } else res.status(404).json({ error: "User not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Delete User
router.delete("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.destroy();
    res.json({ message: "User deleted" });
  } else res.status(404).json({ error: "User not found" });
});

export default router;
