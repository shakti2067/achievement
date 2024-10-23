import express from "express";
import UserModal from "./models/Users.js";
import { otpGenerator } from "./utils/otpGenerator.js";

const router = express.Router();

router.post("/users", (req, res) => {
  UserModal.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

router.get("/", (req, res) => {
  UserModal.find({})
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
});

router.put("/users/:id", (req, res) => {
  const { id } = req.params;

  UserModal.findOneAndUpdate(
    { id },
    {
      name: req.body.name,
      email: req.body.email,
      number: req.body.number,
      role: req.body.role,
      address: req.body.address,
    },
    { new: true } // Return the updated document
  )
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    })
    .catch((err) =>
      res.status(500).json({ message: "Server error", error: err })
    );
});

router.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  UserModal.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    })
    .catch((err) =>
      res.status(500).json({ message: "Server error", error: err })
    );
});

router.get("/me", (req, res) => {
  const me = [
    {
      email: "yash.radicalloop@gmail.com",
      password: 123456,
      first_name: "Yash P",
      last_name: "Marakana",
      phone: "9909286298",
      role: "admin",
    },
  ];
  res.send(me);
});

router.get("/admin-login", (req, res) => {
  const admin = [
    {
      username: "YashMarakana",
      email: "yash.radicalloop@gmail.com",
      password: "12345678",
      id: 1,
    },
  ];
  res.send(admin);
});

// OTP API

router.post("/send-otp", async (req, res) => {
  const { number } = req.body;

  // Validate input
  if (!number) {
    return res.status(400).send("Please enter a phone number.");
  }

  // validate number
  const regex = /^(\+91|91)?[6789]\d{9}$/;

  if (!regex.test(number)) {
    return res.status(400).send("Please enter valid number");
  }
  try {
    // Check if the number is already verified
    const existingUser = await UserModal.findOne({ number });
    if (existingUser) {
      if (existingUser.isOtpVerified) {
        return res.status(400).send("Number already exists and is verified.");
      } else {
        return res.status(400).send("Your number is not verified yet.");
      }
    }

    // Generate OTP
    const otp = otpGenerator();

    // Create OTP entry in the database
    const otpEntry = {
      number,
      otp,
    };

    await UserModal.create(otpEntry);

    return res.status(200).send("OTP sent successfully.");
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).send("An error occurred while sending the OTP.");
  }
});

router.post("/resend-otp", async (req, res) => {
  const { number } = req.body;

  // Validate input
  if (!number) {
    return res.status(400).send("Please enter a phone number.");
  }

  // validate number
  const regex = /^(\+91|91)?[6789]\d{9}$/;

  if (!regex.test(number)) {
    return res.status(400).send("Please enter valid number");
  }
  try {
    // Check if the number is already verified
    const existingUser = await UserModal.findOne({ number });
    if (!existingUser) {
      return res.status(400).send("Number is not found.");
    }

    if (existingUser.isOtpVerified) {
      return res.status(400).send("Number already verified.");
    }

    // Generate OTP
    const otp = otpGenerator();

    // Create OTP entry in the database
    existingUser.otp = otp;

    // save otp

    let save = await existingUser.save();

    return res.status(200).send("OTP resent successfully.");
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).send("An error occurred while sending the OTP.");
  }
});

router.post("/verify-otp", async (req, res) => {
  const { number, otp } = req.body;

  // Validate input
  if (!number) {
    return res.status(400).send("Please enter a phone number.");
  }

  try {
    const existingUser = await UserModal.findOne({ number });
    if (!existingUser) {
      return res.status(400).send("Number is not found.");
    }

    if (existingUser.isOtpVerified) {
      return res.status(400).send("Number already verified.");
    }

    // Verified OTP

    if (existingUser?.otp == otp) {
      existingUser.isOtpVerified = true;
      await existingUser.save();
      return res.status(200).send("OTP Verified successfully.");
    } else {
      return res.status(400).send("Invalid OTP.");
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).send("An error occurred while sending the OTP.");
  }
});

export default router;
