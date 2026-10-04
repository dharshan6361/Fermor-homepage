import { Logo } from "./Logo";

const cols = [
  { h: "Calculators", l: [["SIP", "sip-calculator"], ["EMI", "emi-calculator"], ["Home loan", "home-loan-calculator"], ["FD", "fd-calculator"], ["Income tax", "income-tax-calculator"]].map(([a, b]) => [a, `https://fermor.in/calculators/${b}`]) },
  { h: "Company", l: [["About", "https://fermor.in/about"], ["Blogs", "https://fermor.in/blogs"], ["Contact", "https://fermor.in/contact"]] },
  { h: "Legal", l: [["Privacy", "https://fermor.in/privacy"], ["Terms", "https://fermor.in/terms"], ["Disclosures", "https://fermor.in/about"]] },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper-2/60">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-[0.92rem] text-ink-2">Understand. Act. Grow.<br />Clear money decisions, built in Bengaluru.</p>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <h3 className="text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-ink-3">{c.h}</h3>
              <ul className="mt-4 space-y-2.5">
                {c.l.map(([t, h]) => (
                  <li key={t}><a href={h} className="text-[0.92rem] text-ink-2 hover:text-ink">{t}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-12 border-t border-line pt-6 text-[0.75rem] leading-relaxed text-ink-3">
          Fermor Technologies Pvt. Ltd. operates a financial calculator and education platform for Indian users. Fermor is not a SEBI-registered investment adviser and does not provide personalised financial, investment or tax advice. Calculators and content are for educational purposes only; individual results may vary. This page is a design and engineering exercise, and all figures shown are sample data.
        </p>
        <p className="mt-3 text-[0.75rem] text-ink-3">© 2026 Fermor</p>
      </div>
    </footer>
  );
}
