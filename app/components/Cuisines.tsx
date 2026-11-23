"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import cuisine1 from "../images/cuisine1.webp";
import cuisine2 from "../images/cuisine2.webp";
import cuisine3 from "../images/cuisine3.webp";
import cuisine4 from "../images/cusine4.webp";
import cuisine5 from "../images/cuisine5.webp";
import "../styles/cuisines.css";

/* Small SVG flags — emoji flags show as plain letters on Windows */
const flags: Record<string, ReactNode> = {
  us: (
    <>
      <rect width="30" height="20" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect key={i} y={(i * 20) / 13} width="30" height={20 / 13} fill="#B22234" />
      ))}
      <rect width="13" height={(20 / 13) * 7} fill="#3C3B6E" />
    </>
  ),
  it: (
    <>
      <rect width="10" height="20" fill="#009246" />
      <rect x="10" width="10" height="20" fill="#fff" />
      <rect x="20" width="10" height="20" fill="#CE2B37" />
    </>
  ),
  mx: (
    <>
      <rect width="10" height="20" fill="#006847" />
      <rect x="10" width="10" height="20" fill="#fff" />
      <rect x="20" width="10" height="20" fill="#CE1126" />
      <circle cx="15" cy="10" r="2.6" fill="#8C5A2B" />
    </>
  ),
  jp: (
    <>
      <rect width="30" height="20" fill="#fff" />
      <circle cx="15" cy="10" r="6" fill="#BC002D" />
    </>
  ),
  ae: (
    <>
      <rect width="30" height="20" fill="#fff" />
      <rect width="30" height="6.67" fill="#00732F" />
      <rect y="13.33" width="30" height="6.67" fill="#000" />
      <rect width="8" height="20" fill="#FF0000" />
    </>
  ),
};

function Flag({ code }: { code: string }) {
  return (
    <svg className="cuisine__flag" viewBox="0 0 30 20" aria-hidden="true">
      {flags[code]}
    </svg>
  );
}

type Cuisine = {
  name: string;
  flag: string;
  image: StaticImageData;
  tagline: string;
  description: string;
  dishes: string[];
  count: number;
  accent: string;
};

const cuisines: Cuisine[] = [
  {
    name: "American",
    flag: "us",
    image: cuisine1,
    tagline: "Burgers, fries & crispy tenders",
    description: "Big, bold comfort food — smashed burgers, golden fries and crunchy chicken tenders done right.",
    dishes: ["Smash Burger", "Loaded Fries", "Chicken Tenders"],
    count: 32,
    accent: "#e2552f",
  },
  {
    name: "Italian",
    flag: "it",
    image: cuisine2,
    tagline: "Pasta, pizza & garlic bread",
    description: "Slow-simmered sauces, al dente pasta and stone-baked pizza with plenty of parmesan on top.",
    dishes: ["Chicken Alfredo", "Margherita", "Garlic Bread"],
    count: 28,
    accent: "#3f8a55",
  },
  {
    name: "Mexican",
    flag: "mx",
    image: cuisine3,
    tagline: "Tacos, nachos & fresh salsa",
    description: "Street-style tacos, crunchy nachos and salsa made fresh every morning with a squeeze of lime.",
    dishes: ["Beef Tacos", "Nachos Grande", "Guacamole"],
    count: 24,
    accent: "#e3a21a",
  },
  {
    name: "Asian",
    flag: "jp",
    image: cuisine4,
    tagline: "Noodles, sushi & dumplings",
    description: "Wok-tossed noodles, hand-rolled sushi and golden pan-fried dumplings with a soy-sesame dip.",
    dishes: ["Chow Mein", "Salmon Rolls", "Gyoza"],
    count: 30,
    accent: "#a23b4c",
  },
  {
    name: "Middle Eastern",
    flag: "ae",
    image: cuisine5,
    tagline: "Kebabs, hummus & warm pita",
    description: "Chargrilled kebabs over saffron rice, silky hummus and pillowy pita fresh off the grill.",
    dishes: ["Chicken Kebab", "Hummus Plate", "Tabbouleh"],
    count: 22,
    accent: "#b8742a",
  },
];

const totalDishes = cuisines.reduce((sum, c) => sum + c.count, 0);

export default function Cuisines() {
  const [active, setActive] = useState(0);

  return (
    <section className="cuisines" id="cuisines" aria-labelledby="cuisines-title">
      <div className="cuisines__container">
        <header className="cuisines__head">
          <div>
            <span className="cuisines__eyebrow">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
              </svg>
              Around the world
            </span>
            <h2 className="cuisines__title" id="cuisines-title">
              One kitchen, <span>five cuisines</span>
            </h2>
          </div>

          <div className="cuisines__stats">
            <div>
              <strong>{cuisines.length}</strong>
              <small>Cuisines</small>
            </div>
            <span className="cuisines__stats-divider" />
            <div>
              <strong>{totalDishes}+</strong>
              <small>Dishes</small>
            </div>
          </div>
        </header>

        <div className="cuisines__panels">
          {cuisines.map((c, i) => {
            const isActive = i === active;
            return (
              <article
                key={c.name}
                className={`cuisine ${isActive ? "cuisine--active" : ""}`}
                style={{ "--accent": c.accent } as CSSProperties}
                onMouseEnter={() => setActive(i)}
              >
                <span className="cuisine__bg" aria-hidden="true" />

                <div className="cuisine__plate" aria-hidden={!isActive}>
                  <Image
                    src={c.image}
                    alt={isActive ? `${c.name} platter` : ""}
                    className="cuisine__img"
                    sizes="(max-width: 900px) 80vw, 520px"
                  />
                </div>

                {/* Collapsed view: number, vertical name and flag. Clicking it opens the panel. */}
                <button
                  type="button"
                  className="cuisine__trigger"
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-expanded={isActive}
                  aria-controls={`cuisine-panel-${i}`}
                  tabIndex={isActive ? -1 : 0}
                >
                  <span className="cuisine__num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="cuisine__vname">{c.name}</span>
                  <Flag code={c.flag} />
                </button>

                {/* Expanded view */}
                <div className="cuisine__content" id={`cuisine-panel-${i}`} hidden={!isActive}>
                  <span className="cuisine__label">
                    <Flag code={c.flag} />
                    {String(i + 1).padStart(2, "0")} · {c.count} dishes
                  </span>
                  <h3 className="cuisine__name">{c.name}</h3>
                  <p className="cuisine__tagline">{c.tagline}</p>
                  <p className="cuisine__desc">{c.description}</p>
                  <ul className="cuisine__dishes" aria-label={`Popular ${c.name} dishes`}>
                    {c.dishes.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                  <Link href="/menu" className="cuisine__btn">
                    Explore {c.name}
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
