"use client";

import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import { Button } from "../ui/button";

export function Hero() {
  return (
    <div className="w-full md:max-w-[400px] mx-auto  py-8">
      <Link
        href="/offer?price=1499"
        className="block group rounded-xl overflow-hidden border border-white/5 bg-[#0a0a0a]"
      >
        <div className="px-7 pt-10 pb-6">
          <p className="text-[10px] font-medium uppercase tracking-widest text-white/40 mb-3">
            Limited time offer
          </p>
          <h1 className="text-4xl font-medium leading-[1.1] text-white mb-3">
            Buy 2 pairs,<br />
            pay for{" "}
            <span className="text-amber-300">one.</span>
          </h1>
          <p className="text-sm text-white/40 leading-relaxed mb-8">
            Get two pairs at the price of one. No conditions — just add to cart.
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {["Trending Sneakers", "Limited Time Offer"].map((t) => (
              <span
                key={t}
                className="text-xs text-white/50 border border-white/10 rounded-full px-3 py-1 bg-white/5"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Pay only</p>
              <p className="text-2xl font-medium text-white">
                ₹1,499{" "}
                <span className="text-sm text-white/25 line-through font-normal">₹2,998</span>
              </p>
            </div>
            <Button variant={'secondary'}>
              Buy 2 Pairs
              <IconArrowUpRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="border-t border-white/5 px-7 py-3 flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-white/25 border border-white/10 rounded px-2 py-0.5">
            BOGO
          </span>
          <span className="w-1 h-1 rounded-full bg-white/10" />
          <span className="text-[11px] text-white/25">Offer valid on all pairs</span>
        </div>
      </Link>
    </div>
  );
}