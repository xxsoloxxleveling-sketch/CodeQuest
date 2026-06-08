import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import User from "@/models/User";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Alex.dev" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Missing username or password");
        }

        await dbConnect();

        // Search by username or email
        const user = await User.findOne({ 
          $or: [
            { username: credentials.username },
            { email: credentials.username }
          ]
        });

        if (!user) {
          throw new Error("No user found!");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          name: user.username,
          role: user.role,
          level: user.level,
          xp: user.xp,
          bytes: user.bytes,
          streak: user.streak,
          purchasedItems: user.purchasedItems,
          equippedAvatar: user.equippedAvatar,
          equippedTheme: user.equippedTheme,
          equippedTitle: user.equippedTitle,
          equippedCompanion: user.equippedCompanion,
          completedDays: user.completedDays,
          completedJavaDays: user.completedJavaDays || []
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = user.role;
        token.level = user.level;
        token.xp = user.xp;
        token.bytes = user.bytes;
        token.streak = user.streak;
        token.purchasedItems = user.purchasedItems;
        token.equippedAvatar = user.equippedAvatar;
        token.equippedTheme = user.equippedTheme;
        token.equippedTitle = user.equippedTitle;
        token.equippedCompanion = user.equippedCompanion;
        token.completedDays = user.completedDays;
        token.completedJavaDays = user.completedJavaDays || [];
      }
      
      // Allow session updates (e.g. after a purchase or XP gain)
      if (trigger === "update" && session) {
        return { ...token, ...session };
      }
      
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.sub as string,
          role: token.role as string,
          level: token.level as number,
          xp: token.xp as number,
          bytes: token.bytes as number,
          streak: token.streak as number,
          purchasedItems: token.purchasedItems as string[],
          equippedAvatar: token.equippedAvatar as string,
          equippedTheme: token.equippedTheme as string,
          equippedTitle: token.equippedTitle as string,
          equippedCompanion: token.equippedCompanion as string,
          completedDays: token.completedDays as number[],
          completedJavaDays: token.completedJavaDays as number[] || []
        };
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  }
});

export { handler as GET, handler as POST };
