"use client";

import { useState } from "react";
import { Mail, Send, ArrowLeft, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setName("");
    setEmail("");
    setMessage("");
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <main className="relative w-full min-h-screen flex items-center justify-center p-8 overflow-hidden bg-background">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="bg-surface-container rounded-3xl p-10 shadow-2xl flex flex-col w-full max-w-2xl relative z-20 border border-on-surface-variant/10">
        
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-on-surface-variant hover:text-primary transition-colors text-sm font-medium mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Link>
          
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 glow-primary shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)]">
              <MessageSquare className="text-primary w-8 h-8" />
            </div>
            <div>
              <h1 className="font-headline-xl text-4xl font-bold text-primary tracking-tight">
                Contact Support
              </h1>
              <p className="font-body-lg text-on-surface-variant mt-1">
                We're here to help you on your quest.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          
          {/* Contact Information */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-surface-container-high rounded-2xl p-6 border border-on-surface-variant/10 shadow-sm">
              <h3 className="text-lg font-bold text-on-surface mb-4 flex items-center">
                <Mail className="w-5 h-5 mr-2 text-primary" />
                Email Us
              </h3>
              <p className="text-sm text-on-surface-variant mb-4">
                For any questions, technical issues, or general support, please reach out to us directly via email.
              </p>
              <a 
                href="mailto:support@questhero.tech" 
                className="inline-block text-primary font-bold hover:underline hover:text-primary/80 transition-colors break-all"
              >
                support@questhero.tech
              </a>
            </div>
            
            <div className="bg-surface-container-high rounded-2xl p-6 border border-on-surface-variant/10 shadow-sm">
              <h3 className="text-lg font-bold text-on-surface mb-2">
                Response Time
              </h3>
              <p className="text-sm text-on-surface-variant">
                Our support team typically responds within 24 hours during regular business days.
              </p>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="md:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {isSuccess && (
                <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 text-sm rounded-xl mb-6">
                  Message sent successfully! We will get back to you soon.
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-on-surface-variant mb-1 block">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-surface-container-high border border-on-surface-variant/20 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="text-sm font-medium text-on-surface-variant mb-1 block">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-surface-container-high border border-on-surface-variant/20 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="text-sm font-medium text-on-surface-variant mb-1 block">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full bg-surface-container-high border border-on-surface-variant/20 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="w-full bg-primary text-background font-bold text-lg py-4 px-6 rounded-xl glow-primary hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg flex items-center justify-center mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-background border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send className="mr-2 w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </main>
  );
}
