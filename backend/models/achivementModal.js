import mongoose from "mongoose";

const achivementSchema = new mongoose.Schema({
  achievement_type: String,
  image: String,
  x: Number,
  y: Number,
});

const AchivementModal = mongoose.model("achivement", achivementSchema);

export default AchivementModal;
