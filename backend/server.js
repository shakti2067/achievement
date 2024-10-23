import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { registerFont } from "canvas";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import userRoutes from "./userRoutes.js";
import imageRoutes from "./imageRoutes.js"; // Import your Image model
import multer from "multer";
import path from "path";
import AchivementModal from "./models/achivementModal.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

registerFont(join(__dirname, "./fonts/impact.ttf"), {
  family: "Impact",
});

app.use(express.static("public"));
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/crud");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Image");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file); // Log the file information to verify
  let { achievement_type, x, y } = req.body;
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  AchivementModal.create({ image: req.file.filename, achievement_type, x, y })
    .then((result) => res.json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to save image" });
    });
});

app.get("/getImage", (req, res) => {
  AchivementModal.find({})
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: "No images found" });
      }
      res.json(result); // Respond with the image data from the database
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to retrieve images" });
    });
});

app.use("/api", userRoutes);

app.use("/api/images", imageRoutes);

// Test node server
app.get("/", (req, res) => {
  console.log("Backend server running");
  return res.status(200).send("Backend server running....");
});
const port = 3000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
