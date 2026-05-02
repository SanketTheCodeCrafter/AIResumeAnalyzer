import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username already exists"],
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const userModel = mongoose.model("users", userSchema);