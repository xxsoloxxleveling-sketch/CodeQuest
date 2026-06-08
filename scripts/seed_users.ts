import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, sparse: true },
  role: { type: String, enum: ["student", "educator"], default: "student" },
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  bytes: { type: Number, default: 1500 },
  streak: { type: Number, default: 0 },
  purchasedItems: { type: [String], default: ["neon-theme-id", "default-avatar-id", "default-title-id", "none"] },
  equippedAvatar: { type: String, default: "default-avatar-id" },
  equippedTheme: { type: String, default: "neon-theme-id" },
  equippedTitle: { type: String, default: "default-title-id" },
  equippedCompanion: { type: String, default: "none" },
  completedDays: { type: [Number], default: [] },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function seed() {
  if (!MONGODB_URI) {
    console.error("No MONGODB_URI found");
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const users = [
    {
      username: "Abdullah",
      password: await bcrypt.hash("123123123", 10),
      role: "student",
      xp: 2500,
      level: 2,
    },
    {
      username: "EmaanAfridi96@gmail.com",
      email: "EmaanAfridi96@gmail.com",
      password: await bcrypt.hash("emaanafridi", 10),
      role: "educator",
      xp: 5000,
      level: 3,
    }
  ];

  for (const u of users) {
    const exists = await User.findOne({ username: u.username });
    if (!exists) {
      await User.create(u);
      console.log(`Created user: ${u.username}`);
    } else {
      console.log(`User already exists: ${u.username}`);
    }
  }

  await mongoose.disconnect();
  console.log("Done");
}

seed().catch(console.error);
