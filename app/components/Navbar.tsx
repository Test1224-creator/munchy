"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../images/logo-navbar.webp";
import "../styles/navbar.css";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className={`navbar ${open ? "navbar--open" : ""}`}>
      <nav className="navbar__inner" aria-label="Main">
        <Link href="/" className="navbar__logo" aria-label="Munchy home">
          <Image src={logo} alt="Munchy" loading="eager" sizes="160px" />
        </Link>

        {/* Clicking any link closes the mobile menu */}
        <ul className="navbar__links" id="navbar-links" onClick={() => setOpen(false)}>
          {links.map(({ href, label }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`navbar__link ${active ? "navbar__link--active" : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
          <li className="navbar__mobile-cta">
            <Link href="/signup" className="navbar__btn">Sign Up</Link>
          </li>
        </ul>

        <div className="navbar__actions">
          <Link href="/cart" className="navbar__cart" aria-label="Cart (2 items)">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 8h12l-1 12H7L6 8Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            <span className="navbar__cart-dot" />
          </Link>

          <Link href="/signup" className="navbar__btn navbar__btn--desktop">Sign Up</Link>

          <button
            type="button"
            className="navbar__toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="navbar-links"
            onClick={() => setOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>
    </header>
  );
}
