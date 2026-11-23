"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../images/logo-navbar.webp";
import burger from "../images/top1.webp";
import g1 from "../images/top3.webp";
import g2 from "../images/hero2.webp";
import g3 from "../images/top5.webp";
import g4 from "../images/hero1.webp";
import g5 from "../images/top4.webp";
import g6 from "../images/hero5.webp";
import "../styles/footer.css";

const explore = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/#offers", label: "Hot Deals" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const categories = [
  { href: "/menu", label: "Burgers & Fries" },
  { href: "/menu", label: "Pizza Paradise" },
  { href: "/menu", label: "Pasta & Noodles" },
  { href: "/menu", label: "Grill & Steaks" },
  { href: "/menu", label: "Fresh Salads" },
];

const gallery = [
  { src: g1, alt: "Chicken fajita pizza", tint: "#fde7a7" },
  { src: g2, alt: "Chicken pesto farfalle", tint: "#d9edc2" },
  { src: g3, alt: "Loaded chicken nachos", tint: "#fbd3c4" },
  { src: g4, alt: "Garden fresh salad", tint: "#d9edc2" },
  { src: g5, alt: "Grilled steak platter", tint: "#e9d8c4" },
  { src: g6, alt: "Chicken arrabbiata penne", tint: "#fbd3c4" },
];

const icon = (path: ReactNode) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {path}
  </svg>
);

const socials = [
  {
    label: "Instagram",
    icon: icon(
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
      </>
    ),
  },
  { label: "Facebook", icon: icon(<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5a.5.5 0 0 1 .5-.5Z" />) },
  { label: "X", icon: icon(<path d="M4 4l16 16M20 4 4 20" />) },
  {
    label: "TikTok",
    icon: icon(<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.5 2.6 2.4 4.5 5 5" />),
  },
  {
    label: "YouTube",
    icon: icon(
      <>
        <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
        <path d="m10.5 9.5 4 2.5-4 2.5Z" fill="currentColor" />
      </>
    ),
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [year, setYear] = useState<number | null>(null);

  // Read the year in the browser after load. Reading `new Date()` during render
  // is blocked in Next.js 16, because the page is pre-built ahead of time.
  useEffect(() => {
    const t = window.setTimeout(() => setYear(new Date().getFullYear()), 0);
    return () => window.clearTimeout(t);
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true); // no backend yet — just show the thank-you state
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* ---------- Newsletter card ---------- */}
        <div className="footer__cta">
          <div className="footer__cta-text">
            <span className="footer__cta-eyebrow">Join the Munchy club</span>
            <h2 className="footer__cta-title">Get 15% off your first order</h2>
            <p className="footer__cta-sub">Weekly deals, new dishes and secret menu drops — straight to your inbox.</p>

            {subscribed ? (
              <p className="footer__thanks" role="status">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12.5 10 17l9-10" />
                </svg>
                You&apos;re in! Check your inbox for your code.
              </p>
            ) : (
              <form className="footer__form" onSubmit={onSubmit}>
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="footer__input"
                />
                <button type="submit" className="footer__submit">
                  Subscribe
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </form>
            )}
          </div>

          <div className="footer__cta-art" aria-hidden="true">
            <span className="footer__cta-disc" />
            <Image src={burger} alt="" sizes="(max-width: 900px) 70vw, 420px" className="footer__cta-img" />
          </div>
        </div>

        {/* ---------- Main columns ---------- */}
        <div className="footer__grid">
          <div className="footer__brand">
            <Link href="/" className="footer__logo" aria-label="Munchy home">
              <Image src={logo} alt="Munchy" sizes="150px" />
            </Link>
            <p className="footer__about">
              Fresh, bold food from five cuisines — cooked to order and delivered hot to your door.
            </p>
            <ul className="footer__socials" aria-label="Social media">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href="#" aria-label={s.label} className="footer__social">
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className="footer__col" aria-label="Explore">
            <h3 className="footer__heading">Explore</h3>
            <ul className="footer__links">
              {explore.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="footer__link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer__col" aria-label="Categories">
            <h3 className="footer__heading">Categories</h3>
            <ul className="footer__links">
              {categories.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="footer__link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col">
            <h3 className="footer__heading">Get in touch</h3>
            <ul className="footer__contact">
              <li>
                {icon(
                  <>
                    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
                    <circle cx="12" cy="9.5" r="2.5" />
                  </>
                )}
                <span>24 Market Street, Food District</span>
              </li>
              <li>
                {icon(<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />)}
                <a href="tel:+10000000000">+1 (000) 000-0000</a>
              </li>
              <li>
                {icon(
                  <>
                    <rect x="3" y="5" width="18" height="14" rx="3" />
                    <path d="m4 7 8 6 8-6" />
                  </>
                )}
                <a href="mailto:hello@munchy.example">hello@munchy.example</a>
              </li>
            </ul>
            <div className="footer__hours">
              <span className="footer__open-dot" />
              <div>
                <strong>Open daily</strong>
                <small>10:00 AM – 11:00 PM</small>
              </div>
            </div>
          </div>

          <div className="footer__col footer__col--gallery">
            <h3 className="footer__heading">@munchy</h3>
            <ul className="footer__gallery">
              {gallery.map((g) => (
                <li key={g.alt} style={{ background: g.tint }}>
                  <Image src={g.src} alt={g.alt} sizes="90px" className="footer__thumb" />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------- Bottom bar ---------- */}
        <div className="footer__bottom">
          <p>© {year ?? ""} Munchy. All rights reserved.</p>
          <ul className="footer__legal">
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
            <li>
              <Link href="/terms">Terms</Link>
            </li>
            <li>
              <Link href="/cookies">Cookies</Link>
            </li>
          </ul>
          <a href="#" className="footer__top">
            Back to top
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 19V5M6 11l6-6 6 6" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
