"use client";

import Link from "next/link";
import Image from "next/image";
import { IconArrowUpRight } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";

export function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 47,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (value: number) => String(value).padStart(2, "0");

  return (
    <div className="w-full md:max-w-[420px] mx-auto py-6 relative">
      <Link
        href="/offer?price=1499"
        aria-label="Buy 2 pairs, pay for one — ₹1,499, limited time offer"
        className="group relative block w-full overflow-hidden rounded-md border border-white/10 hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 transition-colors"
      >
        {/* Floating shoe with improved animation */}
        <div
          className="absolute -top-10 -right-12 w-[280px] h-[380px] md:w-[340px] md:h-[340px] z-20 pointer-events-none animate-float-shoe"
          style={{
            filter: "drop-shadow(0 20px 40px rgba(251,191,36,0.15))",
          }}
        >
          <Image
            src="/sh2.png"
            alt="Premium sneaker"
            width={340}
            height={340}
            priority
            className="object-contain w-full h-full transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <div
          className="rounded-t-lg overflow-hidden relative flex flex-col border border-b-0 border-white/5 backdrop-blur-sm"
          style={{
            background: "linear-gradient(145deg, #0a0a0a 0%, #080808 100%)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Enhanced glow orbs with animation */}
          <div
            className="absolute top-[-80px] right-[-80px] w-[300px] h-[300px] rounded-full pointer-events-none z-0 animate-pulse-slow"
            style={{
              background:
                "radial-gradient(circle, rgba(251,191,36,0.12) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-20 left-[-60px] w-[200px] h-[200px] rounded-full pointer-events-none z-0 animate-pulse-slow"
            style={{
              background:
                "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
              animationDelay: "1s",
            }}
          />

          {/* Content */}
          <div className="relative z-10 px-6 pt-8 flex-1">
            {/* Badge with timer */}
            <div className="flex items-center justify-between mb-5">
              <div
                className="inline-flex items-center gap-2 text-sm uppercase tracking- font-bold rounded-md px-2 py-0.5 border"
                style={{
                  color: "rgba(251,191,36,0.9)",
                  borderColor: "rgba(251,191,36,0.2)",
                  background: "rgba(251,191,36,0.06)",
                }}
              >
                Flash Sale
              </div>

              {/* Timer — makes the urgency real instead of just a label */}
              <div
                className="flex items-center gap-1 text-[11px] font-mono font-semibold tabular-nums px-2 py-0.5 rounded-md border"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  borderColor: "rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
                }}
                aria-live="off"
              >
                <span>{formatTime(timeLeft.hours)}</span>:
                <span>{formatTime(timeLeft.minutes)}</span>:
                <span>{formatTime(timeLeft.seconds)}</span>
              </div>
            </div>

            <h1
              className="text-[40px] font-extrabold leading-[1] text-white mb-3 tracking-tighter"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Buy 2 pairs,
              <br />
              pay for{" "}
              <span
                className="relative inline-block text-amber-400"
                style={{
                  textShadow:
                    "0 0 20px rgba(251,191,36,0.3), 0 0 60px rgba(251,191,36,0.1)",
                }}
              >
                one.
                <span
                  className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full bg-gradient-to-r from-amber-400/50 via-amber-400 to-amber-400/50"
                  style={{ filter: "blur(1px)" }}
                />
              </span>
            </h1>

            <p className="text-xs tracking-tight text-muted-foreground font-semibold mb-5 max-w-[240px]">
              2 premium pairs at the price of one. No hidden conditions —
              just add to cart.
            </p>

            {/* Tags with better styling */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { label: "Trending", icon: "🔥" },
                { label: "Limited Stock", icon: "⚡" },
              ].map((t) => (
                <span
                  key={t.label}
                  className="text-sm rounded-md font-semibold text-white px-2 py-0.5 border flex items-center gap-1.5 transition-all duration-200 group-hover:border-white/20 group-hover:bg-white/5"
                  style={{
                    borderColor: "rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  <span className="text-[11px]">{t.icon}</span>
                  {t.label}
                </span>
              ))}
            </div>

            {/* Pricing with improved hierarchy */}
            <div className="flex items-end gap-4">
              <div>
                <div className="flex items-baseline gap-3">
                  <p className="text-5xl tracking-tighter font-bold text-white">
                    ₹1,499
                  </p>
                  <span className="text-xs font-medium text-muted-foreground line-through">
                    ₹2,999
                  </span>
                </div>
              </div>
              <div
                className="px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider"
                style={{
                  background: "rgba(251,191,36,0.1)",
                  color: "rgba(251,191,36,0.8)",
                }}
              >
                50% Off
              </div>
            </div>
          </div>

          {/* Footer with improved visual hierarchy */}
          <div
            className="relative z-10 flex items-center gap-3 border-t px-6 py-3.5"
            style={{ borderColor: "rgba(255,255,255,0.05)" }}
          >
            <span
              className="w-px h-4"
              style={{ background: "rgba(255,255,255,0.05)" }}
            />
            <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>
              Valid on all premium pairs
            </span>
            <span className="ml-auto text-[9px]" style={{ color: "rgba(255,255,255,0.15)" }}>
              • 5k+ sold
            </span>
          </div>
        </div>

        {/* CTA — no longer a nested <Link>; the whole card is already clickable */}
        <Button
          size="lg"
          tabIndex={-1}
          className="w-full rounded-none rounded-b-md bg-amber-400 text-black text-lg font-bold tracking-tighter group-hover:bg-amber-500 transition-colors duration-300"
        >
          Buy Now
          <IconArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Button>

        <style jsx>{`
          @keyframes float-shoe {
            0%,
            100% {
              transform: translateY(0px) rotate(-2deg);
            }
            50% {
              transform: translateY(-10px) rotate(2deg);
            }
          }
          @keyframes pulse-slow {
            0%,
            100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.6;
              transform: scale(1.1);
            }
          }
          .animate-float-shoe {
            animation: float-shoe 4s ease-in-out infinite;
          }
          .animate-pulse-slow {
            animation: pulse-slow 3s ease-in-out infinite;
          }
        `}</style>
      </Link>
    </div>
  );
}