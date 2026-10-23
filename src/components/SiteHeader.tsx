"use client";

import { useEffect, useState } from "react";

import { bar, hours, phoneHref } from "@/data/bar";

import { Logo } from "./Logo";
import { OrderButton } from "./OrderDialog";

const navLinks = [
  { href: "#tonight", label: "Tonight" },
  { href: "#regulars", label: "Regulars" },
  { href: "#visit", label: "Visit" },
  { href: "#follow", label: "Follow" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-snow/10 bg-navy/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="flex shrink-0 items-center gap-3" aria-label="Whoopsie's, back to top">
          <Logo className="w-10" priority />
          <span className="font-display text-2xl">{bar.name}</span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7 font-type text-sm uppercase tracking-[0.2em]">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-sky">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <span className="hidden font-type text-sm text-mist xl:inline">{hours.time}</span>
          <a href={phoneHref(bar.phone)} className="font-bold text-sky transition-colors hover:text-snow">
            {bar.phone}
          </a>
          <OrderButton className="rounded-full bg-cobalt px-5 py-2.5 font-bold text-white transition-colors hover:bg-cobalt-dark">
            Order Now
          </OrderButton>
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full border border-snow/20 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-snow/10 bg-navy md:hidden">
          <ul className="flex flex-col px-4 py-2 font-type text-base uppercase tracking-[0.2em]">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="block py-3" onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
