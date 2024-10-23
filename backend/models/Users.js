import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  number: Number,
  role: String,
  address: String,
  otp: String,
  isOtpVerified: {
    type: Boolean,
    default: false,
  },
});

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
