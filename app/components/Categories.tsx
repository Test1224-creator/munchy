"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import pizza from "../images/pizza.webp";
import burger from "../images/top1.webp";
import penne from "../images/top2.webp";
import pizzaIcon from "../images/top3.webp";
import steak from "../images/top4.webp";
import nachos from "../images/top5.webp";
import salad from "../images/hero1.webp";
import "../styles/categories.css";

type Category = {
  name: string;
  count: string;
  icon: StaticImageData;
  /** where the card sits on the ring around the pizza: 0° = right, 90° = bottom (screen coords) */
  angle: number;
};

// Six cards, 60° apart, going clockwise from the left
const categories: Category[] = [
  { name: "Pizza Paradise", count: "36+ items", icon: pizzaIcon, angle: 180 },
  { name: "Burgers & Fries", count: "48+ items", icon: burger, angle: 240 },
  { name: "Pasta & Noodles", count: "42+ items", icon: penne, angle: 300 },
  { name: "Grill & Steaks", count: "24+ items", icon: steak, angle: 0 },
  { name: "Nachos & Sharing", count: "18+ items", icon: nachos, angle: 60 },
  { name: "Fresh Salads", count: "30+ items", icon: salad, angle: 120 },
];

const round = (n: number) => Math.round(n * 1000) / 1000;

export default function Categories() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  // Pop the cards in when the section scrolls into view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className={`cats ${visible ? "cats--visible" : ""}`} id="categories" aria-labelledby="cats-title">
      <div className="cats__container">
        <header className="cats__head">
          <h2 className="cats__title" id="cats-title">
            Explore delicious food <span>by category</span>
          </h2>
          <div className="cats__side">
            <p className="cats__intro">
              Craving something quick or planning a feast? Pick a category and find your next favourite in seconds.
            </p>
            <Link href="/menu" className="cats__all">
              View all categories
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </header>

        <div className="cats__stage">
          <span className="cats__ring" aria-hidden="true" />
          <div className="cats__blob">
            <Image
              src={pizza}
              alt="Chicken fajita pizza with a cheesy slice being lifted"
              fill
              sizes="(max-width: 900px) 80vw, 420px"
              className="cats__blob-img"
            />
          </div>

          <ul className="cats__list">
            {categories.map((c, i) => (
              <li
                key={c.name}
                className="cats__item"
                style={
                  {
                    "--cos": round(Math.cos((c.angle * Math.PI) / 180)),
                    "--sin": round(Math.sin((c.angle * Math.PI) / 180)),
                    "--i": i,
                  } as CSSProperties
                }
              >
                <Link href="/menu" className="cat">
                  <span className="cat__icon">
                    <Image src={c.icon} alt="" sizes="80px" className="cat__icon-img" />
                  </span>
                  <span className="cat__name">{c.name}</span>
                  <span className="cat__count">{c.count}</span>
                  <span className="cat__arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
