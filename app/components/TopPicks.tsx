"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Image, { type StaticImageData } from "next/image";
import top1 from "../images/top1.webp";
import top2 from "../images/top2.webp";
import top3 from "../images/top3.webp";
import top4 from "../images/top4.webp";
import top5 from "../images/top5.webp";
import "../styles/top-picks.css";

type Pick = {
  image: StaticImageData;
  name: string;
  category: string;
  description: string;
  rating: number;
  time: string;
  kcal: number;
  price: string;
  tint: string; // colour of the disc behind the dish
};

const picks: Pick[] = [
  {
    image: top1,
    name: "Crispy Zinger Burger",
    category: "Burgers",
    description: "Crunchy fried chicken, melted cheddar, lettuce and our smoky house sauce.",
    rating: 4.9,
    time: "15 min",
    kcal: 620,
    price: "$8.99",
    tint: "var(--color-mustard-light)",
  },
  {
    image: top2,
    name: "Creamy Chicken Penne",
    category: "Pasta",
    description: "Penne in a rich tomato-cream sauce with grilled chicken and parmesan.",
    rating: 4.8,
    time: "20 min",
    kcal: 710,
    price: "$12.50",
    tint: "#fbd3c4",
  },
  {
    image: top3,
    name: "Chicken Fajita Pizza",
    category: "Pizza",
    description: "Stone-baked crust, spicy chicken, peppers, olives and stretchy mozzarella.",
    rating: 4.8,
    time: "25 min",
    kcal: 980,
    price: "$15.00",
    tint: "var(--color-sage)",
  },
  {
    image: top4,
    name: "Grilled Steak Platter",
    category: "Grill",
    description: "Juicy sliced steak with roasted potatoes, asparagus and pepper sauce.",
    rating: 4.7,
    time: "30 min",
    kcal: 840,
    price: "$22.90",
    tint: "#e9d8c4",
  },
  {
    image: top5,
    name: "Loaded Chicken Nachos",
    category: "Sharing",
    description: "Crispy tortilla chips piled with chicken, jalapeños, olives and cheese sauce.",
    rating: 4.6,
    time: "15 min",
    kcal: 760,
    price: "$10.75",
    tint: "#fde7a7",
  },
];

const AUTOPLAY_MS = 4500;

export default function TopPicks() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [pages, setPages] = useState(picks.length - 2);
  const [paused, setPaused] = useState(false);
  const [added, setAdded] = useState<number | null>(null);

  /** Width of one card + the gap after it. */
  const step = () => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return 0;
    return card.offsetWidth + parseFloat(getComputedStyle(track).columnGap || "0");
  };

  const measure = useCallback(() => {
    const track = trackRef.current;
    const s = step();
    if (!track || !s) return;
    const visible = Math.max(1, Math.round((track.clientWidth + 1) / s));
    setPages(Math.max(1, picks.length - visible + 1));
    setActive(Math.round(track.scrollLeft / s));
  }, []);

  const scrollToIndex = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: i * step(), behavior: "smooth" });
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      const track = trackRef.current;
      if (!track) return;
      const last = Math.max(0, Math.round((track.scrollWidth - track.clientWidth) / step()));
      const current = Math.round(track.scrollLeft / step());
      let next = current + dir;
      if (next > last) next = 0; // loop back to the start
      if (next < 0) next = last; // loop round to the end
      scrollToIndex(next);
    },
    [scrollToIndex]
  );

  // Keep dots in sync with scrolling / resizing
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    track.addEventListener("scroll", measure, { passive: true });
    return () => {
      ro.disconnect();
      track.removeEventListener("scroll", measure);
    };
  }, [measure]);

  // Autoplay (paused on hover / focus / touch, off for reduced motion)
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, go]);

  const addToCart = (i: number) => {
    setAdded(i);
    window.setTimeout(() => setAdded((a) => (a === i ? null : a)), 1400);
  };

  return (
    <section className="picks" id="top-picks" aria-labelledby="picks-title">
      <div className="picks__container">
        <header className="picks__head">
          <div>
            <span className="picks__eyebrow">
              <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
                <path fill="currentColor" d="m12 2 2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 16.9 5.9 20.4l1.5-6.8L2.2 9l6.9-.7L12 2Z" />
              </svg>
              Crowd favourites
            </span>
            <h2 className="picks__title" id="picks-title">
              Our Top <span>Picks</span>
            </h2>
          </div>

          <div className="picks__nav">
            <button type="button" className="picks__arrow" aria-label="Previous dishes" onClick={() => go(-1)}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <button type="button" className="picks__arrow picks__arrow--next" aria-label="Next dishes" onClick={() => go(1)}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </header>

        <div
          ref={trackRef}
          className="picks__track"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
        >
          {picks.map((p, i) => (
            <article key={p.name} className="pick" style={{ "--tint": p.tint } as CSSProperties}>
              <div className="pick__media">
                <span className="pick__disc" aria-hidden="true" />
                <span className="pick__rank">#{i + 1}</span>
                <span className="pick__rating" aria-label={`Rated ${p.rating} out of 5`}>
                  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                    <path fill="currentColor" d="m12 2 2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 16.9 5.9 20.4l1.5-6.8L2.2 9l6.9-.7L12 2Z" />
                  </svg>
                  {p.rating.toFixed(1)}
                </span>
                <Image
                  src={p.image}
                  alt={p.name}
                  className="pick__img"
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 380px"
                />
              </div>

              <div className="pick__body">
                <span className="pick__category">{p.category}</span>
                <h3 className="pick__name">{p.name}</h3>
                <p className="pick__desc">{p.description}</p>

                <div className="pick__meta">
                  <span>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" />
                    </svg>
                    {p.time}
                  </span>
                  <span>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 3s5 4.5 5 10a5 5 0 0 1-10 0c0-2.5 1.5-4 1.5-4S9 12 11 12c0-3 1-6 1-9Z" />
                    </svg>
                    {p.kcal} kcal
                  </span>
                </div>

                <div className="pick__foot">
                  <span className="pick__price">{p.price}</span>
                  <button
                    type="button"
                    className={`pick__add ${added === i ? "pick__add--done" : ""}`}
                    onClick={() => addToCart(i)}
                    aria-label={added === i ? `${p.name} added to cart` : `Add ${p.name} to cart`}
                  >
                    {added === i ? (
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12.5 10 17l9-10" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    )}
                    <span>{added === i ? "Added" : "Add"}</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="picks__dots" role="tablist" aria-label="Choose slide">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to slide ${i + 1}`}
              className={`picks__dot ${i === active ? "picks__dot--active" : ""}`}
              onClick={() => scrollToIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
