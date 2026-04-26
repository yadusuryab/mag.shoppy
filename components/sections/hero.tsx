"use client";

import Link from "next/link";
import Image from "next/image";
import { IconArrowUpRight } from "@tabler/icons-react";

export function Hero() {
  return (
    <div className="w-full md:max-w-[400px] p mx-auto py-8">
      <div
  className="absolute top-[-10] right-[-24] w-[220px] h-[220px] z-40"
  style={{ animation: "floatShoe 3s ease-in-out infinite" }}
>
  <Image
    src="/sh3.png"
    alt="sneaker"
    width={220}
    height={220}
    className="object-contain w-full h-full"
    style={{
      filter:
        "drop-shadow(0 16px 40px rgba(251,191,36,0.3)) drop-shadow(0 4px 16px rgba(0,0,0,0.6))",
    }}
  />
</div>
      <Link
        href="/offer?price=1499"
        className="block group rounded-[20px] overflow-hidden relative flex flex-col"
        style={{ background: "#080808",}}
      >
        {/* Glow orbs */}
        <div className="absolute top-[-60px] right-[-60px] w-[260px] h-[260px] rounded-full pointer-events-none z-0"
          style={{ background: "radial-gradient(circle, rgba(251,191,36,0.18) 0%, transparent 70%)" }} />
        <div className="absolute bottom-20 left-[-40px] w-[180px] h-[180px] rounded-full pointer-events-none z-0"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)" }} />
{/* Shoe — absolute top-right, floating */}

        {/* Content */}
        <div className="relative z-10 px-6 pt-8 flex-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest rounded-full px-3 py-1 mb-5 border"
            style={{ color: "rgba(251,191,36,0.9)", borderColor: "rgba(251,191,36,0.2)", background: "rgba(251,191,36,0.05)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Limited time offer
          </div>

          <h1 className="text-[38px] font-extrabold leading-[1.05] text-white mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
            Buy 2<br /> pairs,<br />
            pay for <span className="text-amber-400">one.</span>
          </h1>

          <p className="text-[13px] leading-relaxed mb-5 max-w-[240px]" style={{ color: "rgba(255,255,255,0.35)" }}>
            Get two pairs at the price of one. No conditions — just add to cart.
          </p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {["Trending Sneakers", "Limited Time", "BOGO"].map((t) => (
              <span key={t} className="text-[10px] rounded-full px-2.5 py-1 border"
                style={{ color: "rgba(255,255,255,0.35)", borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[9px] uppercase tracking-[0.15em] mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>Pay only</p>
              <p className="text-[28px] font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                ₹1,499{" "}
                <span className="text-[13px] font-light line-through" style={{ color: "rgba(255,255,255,0.2)" }}>₹2,998</span>
              </p>
            </div>
            <button className="flex items-center gap-2 text-black text-[13px] font-medium rounded-full px-5 py-3 whitespace-nowrap transition-transform hover:scale-105"
              style={{ background: "#fbbf24" }}>
              Buy 2 Pairs
              <IconArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Shoe stage */}
        
        {/* Footer */}
        <div className="relative z-10 flex items-center gap-2 border-t px-6 py-3"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          <span className="text-[9px] uppercase tracking-widest rounded px-2 py-0.5 border"
            style={{ color: "rgba(251,191,36,0.6)", borderColor: "rgba(251,191,36,0.15)", background: "rgba(251,191,36,0.05)" }}>
            BOGO
          </span>
          <span className="w-1 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
          <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>Offer valid on all pairs</span>
        </div>
      </Link>

      {/* Keyframes — add to globals.css */}
      {/* 
        @keyframes floatShoe {
          0%, 100% { transform: translateX(-50%) translateY(0) rotate(-6deg); }
          50% { transform: translateX(-50%) translateY(-16px) rotate(-3deg); }
        }
        @keyframes floatShoe2 {
          0%, 100% { transform: scaleX(-1) rotate(8deg) translateY(0); }
          50% { transform: scaleX(-1) rotate(5deg) translateY(-10px); }
        }
      */}
    </div>
  );
}