import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { dayId, track } = await req.json();

    if (typeof dayId !== "number") {
      return NextResponse.json({ error: "Invalid day ID" }, { status: 400 });
    }

    const isJava = track === "java";

    await dbConnect();

    const user = await User.findOne({ username: session.user.name });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if day is already completed
    const list = isJava ? (user.completedJavaDays || []) : (user.completedDays || []);
    if (list.includes(dayId)) {
      return NextResponse.json({ 
        message: "Day already completed", 
        completedDays: user.completedDays || [],
        completedJavaDays: user.completedJavaDays || [],
        xp: user.xp 
      });
    }

    // Add the day to completed days and grant XP & Bytes
    if (isJava) {
      if (!user.completedJavaDays) user.completedJavaDays = [];
      user.completedJavaDays.push(dayId);
      user.markModified("completedJavaDays");
    } else {
      if (!user.completedDays) user.completedDays = [];
      user.completedDays.push(dayId);
      user.markModified("completedDays");
    }
    
    user.xp += 250; // 250 XP per lecture
    user.bytes += 100; // 100 Bytes per lecture

    // Level up logic (every 500 XP = 1 Level)
    const newLevel = Math.floor(user.xp / 500) + 1;
    if (newLevel > user.level) {
      user.level = newLevel;
    }

    await user.save();

    return NextResponse.json({
      message: "You completed it correctly! +100 Bytes & +250 XP",
      completedDays: user.completedDays || [],
      completedJavaDays: user.completedJavaDays || [],
      xp: user.xp,
      bytes: user.bytes,
      level: user.level,
    });
  } catch (error: any) {
    console.error("Complete Day Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
