"use client";

import { useCallback, useRef, useState, type CSSProperties } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import hero1 from "../images/hero1.webp";
import hero2 from "../images/hero2.webp";
import hero3 from "../images/hero3.webp";
import hero4 from "../images/hero4.webp";
import hero5 from "../images/hero5.webp";
import "../styles/hero.css";

type Dish = {
  image: StaticImageData;
  tag: string;
  title: string;
  description: string;
  price: string;
};

const dishes: Dish[] = [
  {
    image: hero1,
    tag: "Fresh & Light",
    title: "Garden Fresh Salad",
    description:
      "Crisp mixed greens, juicy tomato wedges, cucumber and red onion, tossed in a light sesame vinaigrette.",
    price: "$9.50",
  },
  {
    image: hero2,
    tag: "Chef's Favourite",
    title: "Chicken Pesto Farfalle",
    description:
      "Bow-tie pasta in creamy basil pesto with grilled chicken, roasted cherry tomatoes and toasted pine nuts.",
    price: "$14.90",
  },
  {
    image: hero3,
    tag: "Mediterranean",
    title: "Heart Pasta Salad",
    description:
      "Playful heart-shaped pasta with feta, black olives, roasted peppers and arugula in a herby dressing.",
    price: "$12.75",
  },
  {
    image: hero4,
    tag: "Today's Special",
    title: "Greek Feta Pasta Bowl",
    description:
      "A hearty bowl of pasta, creamy feta cubes, sweet peppers and fresh basil, finished with olive oil.",
    price: "$13.20",
  },
  {
    image: hero5,
    tag: "Spicy Pick",
    title: "Chicken Arrabbiata Penne",
    description:
      "Penne in a fiery tomato sauce, topped with grilled chicken, shaved parmesan and fresh basil.",
    price: "$15.40",
  },
];

const COUNT = dishes.length;
/** How long the text waits before swapping, so the dish moves first. */
const TEXT_SWAP_MS = 420;

export default function Hero() {
  const [active, setActive] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [spin, setSpin] = useState(0);
  const [paused, setPaused] = useState(false);

  const activeRef = useRef(0);
  const swapTimer = useRef<number | undefined>(undefined);

  const goTo = useCallback((index: number) => {
    const current = activeRef.current;
    const next = ((index % COUNT) + COUNT) % COUNT;
    if (next === current) return;

    // Take the shortest way round so the bowls spin the natural direction
    let delta = next - current;
    if (delta > COUNT / 2) delta -= COUNT;
    if (delta < -COUNT / 2) delta += COUNT;

    activeRef.current = next;
    setActive(next);
    setSpin((s) => s + delta);
    setLeaving(true);

    window.clearTimeout(swapTimer.current);
    swapTimer.current = window.setTimeout(() => {
      setTextIndex(next);
      setLeaving(false);
    }, TEXT_SWAP_MS);
  }, []);

  const dish = dishes[textIndex];

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="Featured dishes"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__container">
        {/* ---------- Left: text ---------- */}
        <div className="hero__content">
          <div
            key={textIndex}
            className={`hero__text ${leaving ? "hero__text--leaving" : ""}`}
            aria-live="polite"
          >
            <span className="hero__tag">
              <span className="hero__tag-dot" />
              {dish.tag}
            </span>

            <h1 className="hero__title">
              {dish.title}
              <svg className="hero__swoosh" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
                <path d="M4 18C80 6 190 2 296 10" />
              </svg>
            </h1>

            <p className="hero__desc">{dish.description}</p>

            <div className="hero__cta">
              <Link href="/menu" className="hero__btn">
                Order Now
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <span className="hero__price">
                <small>Starting at</small>
                {dish.price}
              </span>
            </div>
          </div>

          {/* ---------- Slider controls ---------- */}
          <div className="hero__controls">
            <button type="button" className="hero__arrow" aria-label="Previous dish" onClick={() => goTo(active - 1)}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>

            <div className="hero__dots" role="tablist" aria-label="Choose a dish">
              {dishes.map((d, i) => (
                <button
                  key={d.title}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={d.title}
                  className={`hero__dot ${i === active ? "hero__dot--active" : ""}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>

            <button type="button" className="hero__arrow hero__arrow--next" aria-label="Next dish" onClick={() => goTo(active + 1)}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>

            <span className="hero__count">
              <strong>{String(active + 1).padStart(2, "0")}</strong> / {String(COUNT).padStart(2, "0")}
            </span>
          </div>

          {/* Autoplay: when this bar finishes filling, move to the next dish. Hovering pauses it. */}
          <div className="hero__progress" aria-hidden="true">
            <span
              key={active}
              className="hero__progress-bar"
              style={{ animationPlayState: paused ? "paused" : "running" }}
              onAnimationEnd={() => goTo(active + 1)}
            />
          </div>
        </div>
      </div>

      {/* ---------- Right: dish orbit ---------- */}
      <div className="hero__stage" style={{ "--spin": spin } as CSSProperties}>
        <div className="hero__orbit" aria-hidden="true" />
        {dishes.map((d, i) => {
          const slot = (i - active + COUNT) % COUNT;
          const isMain = slot === 0;
          return (
            <button
              key={d.title}
              type="button"
              className={`hero__dish hero__dish--slot-${slot}`}
              onClick={() => goTo(i)}
              tabIndex={isMain ? -1 : 0}
              aria-hidden={isMain}
              aria-label={`Show ${d.title}`}
            >
              <span className="hero__dish-plate">
                <Image
                  src={d.image}
                  alt={isMain ? d.title : ""}
                  fill
                  sizes="(max-width: 900px) 70vw, 640px"
                  loading="eager"
                  fetchPriority={i === 0 ? "high" : "auto"}
                  className="hero__dish-img"
                />
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
