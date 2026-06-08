"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Code, Rocket, Key, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      if (res?.error) {
        setError(res.error);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative w-full min-h-screen flex items-center justify-center p-8 overflow-hidden bg-background">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="bg-surface-container rounded-3xl p-10 shadow-2xl flex flex-col items-center w-full max-w-md relative z-20 border border-on-surface-variant/10">
        <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-primary/20 glow-primary shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)]">
          <Code className="text-primary w-10 h-10" />
        </div>

        <h1 className="font-headline-xl text-[48px] font-bold text-primary text-center mb-2 tracking-tight">
          CodeQuest
        </h1>
        <p className="font-body-lg text-[18px] text-on-surface-variant text-center mb-8">
          See it. Play it. Level up.
        </p>

        <form onSubmit={handleLogin} className="w-full space-y-5">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-on-surface-variant mb-1 block">
                Username or Email
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-surface-container-high border border-on-surface-variant/20 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="relative">
              <label className="text-sm font-medium text-on-surface-variant mb-1 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface-container-high border border-on-surface-variant/20 rounded-xl pl-4 pr-12 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-background font-bold text-lg py-4 px-6 rounded-xl glow-primary hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg flex items-center justify-center mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-background border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Key className="mr-2 w-5 h-5" />
                Start Quest
              </>
            )}
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-on-surface-variant/10 w-full text-center">
          <p className="text-sm text-on-surface-variant mb-2">
            Need an account? Talk to your educator.
          </p>
          <p className="text-sm text-on-surface-variant">
            Have an issue? <Link href="/contact" className="text-primary hover:underline transition-colors">Contact Support</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
