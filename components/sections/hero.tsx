"use client";

import Poster2 from "@/public/poster-3.avif";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { IconArrowUpRight } from "@tabler/icons-react";
import { Button } from "../ui/button";

export function Hero() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="w-full md:max-w-[400px] mx-auto px-4 sm:px-6">
      <Link
        href="/offer?price=1199"
        className="block relative group"
        onClick={() => setIsLoading(true)}
      >
        {/* Outer rounded clip — everything sits inside this */}
        <div className="relative rounded-md overflow-hidden ">

          {/* Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center z-10">
              <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Poster image — fills the card */}
          <Image
            src={Poster2}
            alt="BOGO at ₹999!"
            width={800}
            height={600}
            className={`w-full h-auto block transition-all duration-500 group-hover:scale-[1.02] ${
              imageLoaded ? "opacity-100" : "opacity-0"
            } ${isLoading ? "opacity-70" : ""}`}
            priority
            quality={60}
            sizes="(max-width: 640px) 95vw, (max-width: 1024px) 80vw, 600px"
            onLoad={() => setImageLoaded(true)}
            placeholder="blur"
          />

          {/* Dark scrim at bottom so glass reads clearly */}

          {/* Glass CTA strip — pinned to bottom inside the image */}
          <div className="absolute bottom-0 w-full z-10">
            <div className="b   bg-black px-4 py-3 flex items-center justify-between gap-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <div className="flex flex-col min-w-0">
                <span className="text-white/50 text-[10px] font-semibold uppercase tracking-widest leading-none mb-1">
                  2 PAIRS OFFER
                </span>
                <span className="text-white font-bold text-base leading-tight">
                  Buy @ ₹1499
                </span>
              </div>

              <Button className="rounded-md">
                Claim Offer
                <IconArrowUpRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div> 

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 rounded-md bg-black/20 backdrop-blur-xl flex items-center justify-center z-20">
              <div className="w-5 h-1 border-2  border-t-white rounded-full animate-spin" />
          </div>
        )}
      </Link>
    </div>
  );
}