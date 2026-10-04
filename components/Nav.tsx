"use client";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const links = [
  { href: "#product", label: "Product" },
  { href: "#calculators", label: "Calculators" },
  { href: "#ask", label: "Ask" },
  { href: "#insights", label: "Insights" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled || open
          ? "border-b border-line bg-paper/90 backdrop-blur"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <a href="#top" aria-label="Fermor home" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[0.92rem] text-ink-2 transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://fermor.in/sign-in"
            className="px-3 py-2 text-[0.92rem] text-ink-2 hover:text-ink"
          >
            Log in
          </a>
          <a
            href="#join"
            className="rounded-full bg-moss-dark px-5 py-2.5 text-[0.92rem] font-medium text-paper transition-colors hover:bg-ink"
          >
            Join the waitlist
          </a>
        </div>

        <button
          type="button"
          className="-mr-2 flex h-10 w-10 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            {open ? <path d="M5 5l12 12M17 5L5 17" /> : <path d="M3 7h16M3 15h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-paper px-5 pb-10 pt-4 md:hidden"
        >
          <ul className="divide-y divide-line">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="display block py-4 text-2xl"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3">
            <a
              href="#join"
              onClick={() => setOpen(false)}
              className="rounded-full bg-moss-dark px-5 py-3.5 text-center font-medium text-paper"
            >
              Join the waitlist
            </a>
            <a
              href="https://fermor.in/sign-in"
              className="rounded-full border border-line px-5 py-3.5 text-center"
            >
              Log in
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
