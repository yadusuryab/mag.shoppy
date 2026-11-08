"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { client } from "@/sanityClient";

interface Shot {
  id: string;
  url: string;
  width: number;
  height: number;
}

const PAGE_SIZE = 12;
const FALLBACK = { width: 750, height: 1334 };

/* ---------- Skeleton (varied heights so it feels like the real wall) ---------- */

const SKELETON_RATIOS = [1.7, 1.3, 2.0, 1.5, 1.8, 1.4, 1.9, 1.6];

function Skeleton() {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4">
      {SKELETON_RATIOS.map((r, i) => (
        <div
          key={i}
          className="mb-3 sm:mb-4 break-inside-avoid rounded-xl bg-gray-100 animate-pulse"
          style={{ aspectRatio: `1 / ${r}` }}
        />
      ))}
    </div>
  );
}

/* ---------- Lightbox ---------- */

function Lightbox({
  shots,
  index,
  onChange,
  onClose,
}: {
  shots: Shot[];
  index: number;
  onChange: (i: number) => void;
  onClose: () => void;
}) {
  const touchX = useRef<number | null>(null);
  const shot = shots[index];

  const prev = useCallback(
    () => onChange((index - 1 + shots.length) % shots.length),
    [index, shots.length, onChange],
  );
  const next = useCallback(
    () => onChange((index + 1) % shots.length),
    [index, shots.length, onChange],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, prev, next]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Customer review screenshot"
      className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4"
      onClick={onClose}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null || shots.length < 2) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        ✕
      </button>

      {shots.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous review"
            className="absolute left-3 sm:left-6 hidden sm:flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-white text-2xl hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next review"
            className="absolute right-3 sm:right-6 hidden sm:flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-white text-2xl hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            ›
          </button>
        </>
      )}

      <Image
        key={shot.id}
        src={shot.url}
        alt={`Customer review ${index + 1} of ${shots.length}`}
        width={shot.width}
        height={shot.height}
        sizes="(max-width: 640px) 100vw, 480px"
        priority
        onClick={(e) => e.stopPropagation()}
        className="w-auto h-auto max-w-full max-h-[85vh] max-h-[85dvh] rounded-xl object-contain"
      />

      {shots.length > 1 && (
        <p className="absolute bottom-4 text-sm text-white/80">
          {index + 1} / {shots.length}
        </p>
      )}
    </div>
  );
}

/* ---------- Marquee ---------- */

function Marquee({
  shots,
  onOpen,
}: {
  shots: Shot[];
  onOpen: (i: number) => void;
}) {
  // Repeat short lists so one "set" is always wider than the screen,
  // then render the set twice for a seamless -50% loop.
  const repeat = Math.max(1, Math.ceil(10 / shots.length));
  const set = Array.from({ length: repeat }, () => shots).flat();
  const seconds = Math.max(30, set.length * 4);

  const renderSet = (hidden: boolean) =>
    set.map((s, i) => (
      <button
        key={`${hidden ? "b" : "a"}-${s.id}-${i}`}
        type="button"
        onClick={() => onOpen(i % shots.length)}
        aria-label={`Open review ${(i % shots.length) + 1}`}
        aria-hidden={hidden}
        tabIndex={hidden ? -1 : 0}
        className="shrink-0 h-56 sm:h-72 overflow-hidden rounded-xl bg-gray-100 ring-1 ring-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
      >
        <Image
          src={s.url}
          alt={hidden ? "" : `Customer review ${(i % shots.length) + 1}`}
          width={s.width}
          height={s.height}
          sizes="200px"
          className="h-full w-auto"
          draggable={false}
        />
      </button>
    ));

  return (
    <div
      className="reviews-marquee mb-8 sm:mb-10 overflow-hidden"
      style={
        {
          "--marquee-duration": `${seconds}s`,
          maskImage:
            "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
        } as React.CSSProperties
      }
    >
      <style>{`
        @keyframes reviews-marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .reviews-marquee-track {
          animation: reviews-marquee-scroll var(--marquee-duration, 40s) linear infinite;
          will-change: transform;
        }
        .reviews-marquee:hover .reviews-marquee-track,
        .reviews-marquee:focus-within .reviews-marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .reviews-marquee { overflow-x: auto; }
          .reviews-marquee-track { animation: none; }
        }
      `}</style>
      <div className="reviews-marquee-track flex w-max gap-3 sm:gap-4 pr-3 sm:pr-4">
        {renderSet(false)}
        {renderSet(true)}
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export default function ReviewsPage({ shoeId }: { shoeId?: string }) {
  const [shots, setShots] = useState<Shot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await client.fetch<
        {
          _id: string;
          images?: {
            url?: string;
            width?: number;
            height?: number;
          }[];
        }[]
      >(
        `*[_type == "review" && isApproved == true
            ${shoeId ? "&& shoe._ref == $shoeId" : ""}]
          | order(createdAt desc) {
            _id,
            "images": reviewImages[].asset->{
              url,
              "width": metadata.dimensions.width,
              "height": metadata.dimensions.height
            }
          }`,
        shoeId ? { shoeId } : {},
      );

      // One review document can hold several screenshots - flatten them all.
      const flat: Shot[] = data.flatMap((r) =>
        (r.images ?? [])
          .filter((img) => img?.url)
          .map((img, i) => ({
            id: `${r._id}-${i}`,
            url: img.url as string,
            width: img.width ?? FALLBACK.width,
            height: img.height ?? FALLBACK.height,
          })),
      );

      setShots(flat);
    } catch (e) {
      console.error("Error fetching reviews:", e);
      setError("Could not load reviews. Check your connection and try again.");
      setShots([]);
    } finally {
      setLoading(false);
    }
  }, [shoeId]);

  useEffect(() => {
    load();
  }, [load]);

  const closeLightbox = useCallback(() => setOpenIndex(null), []);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-12">
      <header className="mb-6 sm:mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Customer reviews
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Real messages from real customers. Tap any review to enlarge.
          </p>
        </div>
        {!loading && !error && shots.length > 0 && (
          <p className="shrink-0 text-sm font-medium text-gray-700">
            {shots.length} {shots.length === 1 ? "review" : "reviews"}
          </p>
        )}
      </header>

      {loading && <Skeleton />}

      {!loading && error && (
        <div className="py-20 flex flex-col items-center text-center">
          <p className="text-gray-800">{error}</p>
          <button
            type="button"
            onClick={load}
            className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && shots.length === 0 && (
        <p className="py-20 text-center text-gray-500">
          No reviews yet. Check back soon.
        </p>
      )}

      {!loading && !error && shots.length > 0 && (
        <>
          <Marquee shots={shots} onOpen={setOpenIndex} />

          {/* Masonry: screenshots keep their natural aspect ratio */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4">
            {shots.slice(0, visible).map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-label={`Open review ${i + 1}`}
                className="group relative block w-full mb-3 sm:mb-4 break-inside-avoid overflow-hidden rounded-xl bg-gray-100 ring-1 ring-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
              >
                <Image
                  src={s.url}
                  alt={`Customer review ${i + 1}`}
                  width={s.width}
                  height={s.height}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </button>
            ))}
          </div>

          {visible < shots.length && (
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="px-8 min-h-[44px] rounded-full border border-gray-400 text-sm font-medium hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
              >
                Show more reviews
              </button>
            </div>
          )}
        </>
      )}

      {openIndex !== null && shots[openIndex] && (
        <Lightbox
          shots={shots}
          index={openIndex}
          onChange={setOpenIndex}
          onClose={closeLightbox}
        />
      )}
    </section>
  );
}