require("dotenv").config({ path: ".env.local" });
// If not found in local, fallback to .env
require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI not defined.");
  process.exit(1);
}

const UserSchema = new mongoose.Schema({
  username: String,
  level: Number,
  xp: Number,
  bytes: Number,
  streak: Number,
  completedDays: [Number]
}, { strict: false });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function resetUsers() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    const result = await User.updateMany(
      {}, 
      {
        $set: {
          level: 1,
          xp: 0,
          bytes: 1500,
          streak: 0,
          completedDays: []
        }
      }
    );

    console.log(`Successfully reset ${result.modifiedCount} users.`);
    process.exit(0);
  } catch (error) {
    console.error("Error resetting users:", error);
    process.exit(1);
  }
}

resetUsers();
