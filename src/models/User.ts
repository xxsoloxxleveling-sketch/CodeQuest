import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      sparse: true, // Allow email to be optional but unique if present
    },
    role: {
      type: String,
      enum: ["student", "educator"],
      default: "student",
    },
    level: {
      type: Number,
      default: 1,
    },
    xp: {
      type: Number,
      default: 0,
    },
    bytes: {
      type: Number,
      default: 0, // Starting bytes for the shop
    },
    streak: {
      type: Number,
      default: 0,
    },
    purchasedItems: {
      type: [String],
      default: ["neon-theme-id", "default-avatar-id", "default-title-id", "none"],
    },
    equippedAvatar: {
      type: String,
      default: "default-avatar-id",
    },
    equippedTheme: {
      type: String,
      default: "neon-theme-id",
    },
    equippedTitle: {
      type: String,
      default: "default-title-id",
    },
    equippedCompanion: {
      type: String,
      default: "none",
    },
    completedDays: {
      type: [Number],
      default: [],
    },
    completedJavaDays: {
      type: [Number],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
