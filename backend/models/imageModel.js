import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  text: String,
  gender: String,
  email: String,
  phone: String,
  address: String,
  age: Number,
  image: Buffer, // Store the image as a binary buffer
});

const Image = mongoose.model("Image", imageSchema);

export default Image;
