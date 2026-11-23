"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import deal1 from "../images/deal1.webp";
import deal2 from "../images/deal2.webp";
import deal3 from "../images/deal3.webp";
import "../styles/deals.css";

type Deal = {
  image: StaticImageData;
  alt: string;
  label: string;
  className: string;
};

const deals: Deal[] = [
  {
    image: deal1,
    alt: "Crispy & juicy chicken burger — up to 30% off",
    label: "Order the Crispy Chicken Burger, up to 30% off",
    className: "deal--a",
  },
  {
    image: deal2,
    alt: "Creamy chicken alfredo — up to 40% off",
    label: "Order the Creamy Chicken Alfredo, up to 40% off",
    className: "deal--b",
  },
  {
    image: deal3,
    alt: "Spicy chicken shawarma wrap — limited time offer, up to 40% off",
    label: "Order the Spicy Chicken Shawarma Wrap, up to 40% off",
    className: "deal--c",
  },
];

/** Time left until local midnight, split into h / m / s. */
function timeLeft() {
  const now = new Date();
  const end = new Date(now);
  end.setHours(24, 0, 0, 0);
  const total = Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000));
  return [Math.floor(total / 3600), Math.floor((total % 3600) / 60), total % 60];
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function Deals() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [time, setTime] = useState<number[] | null>(null);

  // Live countdown (starts on the client so server and client markup match)
  useEffect(() => {
    const tick = () => setTime(timeLeft());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);

  // Reveal the cards when the section scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
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
    <section ref={sectionRef} id="offers" className={`deals ${visible ? "deals--visible" : ""}`}>
      <div className="deals__blob deals__blob--one" aria-hidden="true" />
      <div className="deals__blob deals__blob--two" aria-hidden="true" />

      <div className="deals__container">
        <header className="deals__head">
          <div>
            <span className="deals__eyebrow">
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M13.5 1.5s1 3.2-1.4 6.1C10.3 9.8 8 11 8 14.3a4 4 0 0 0 8 .2c0-1.6-.8-2.8-.8-2.8s2.8 1 2.8 5A6 6 0 0 1 6 17c0-5.6 4.7-7.6 6.3-11.2.6-1.4 1.2-4.3 1.2-4.3Z"
                />
              </svg>
              Hot Deals
            </span>
            <h2 className="deals__title">
              Today&apos;s <span>sizzling</span> offers
            </h2>
          </div>

          <div className="deals__timer" role="timer" aria-label="Deals end at midnight">
            <span className="deals__timer-label">Ends in</span>
            <div className="deals__timer-boxes">
              {["hrs", "min", "sec"].map((unit, i) => (
                <div key={unit} className="deals__timer-box">
                  <strong suppressHydrationWarning>{time ? pad(time[i]) : "--"}</strong>
                  <small>{unit}</small>
                </div>
              ))}
            </div>
          </div>
        </header>

        <div className="deals__grid">
          {deals.map((deal, i) => (
            <Link
              key={deal.className}
              href="/menu"
              className={`deal ${deal.className}`}
              style={{ transitionDelay: visible ? `${i * 120}ms` : "0ms" }}
              aria-label={deal.label}
            >
              <Image
                src={deal.image}
                alt={deal.alt}
                fill
                sizes={i === 2 ? "(max-width: 900px) 100vw, 600px" : "(max-width: 900px) 100vw, 640px"}
                className="deal__img"
              />
              <span className="deal__shine" aria-hidden="true" />
              <span className="deal__go" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
