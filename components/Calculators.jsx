import { Reveal } from "./Reveal";

const calcs = [
  { name: "SIP", slug: "sip-calculator", formula: "P × [((1+i)ⁿ − 1) ÷ i]", desc: "What a monthly investment could become." },
  { name: "EMI", slug: "emi-calculator", formula: "P·r·(1+r)ⁿ ÷ ((1+r)ⁿ − 1)", desc: "Your monthly instalment on any loan." },
  { name: "Home loan", slug: "home-loan-calculator", formula: "EMI × n − P", desc: "Total interest and the full repayment." },
  { name: "Fixed deposit", slug: "fd-calculator", formula: "P × (1 + r/m)^(m·t)", desc: "Maturity value with compounding." },
  { name: "PPF", slug: "ppf-calculator", formula: "Σ deposits × (1 + r)^k", desc: "15-year tax-free growth, year by year." },
  { name: "Lumpsum", slug: "lumpsum-calculator", formula: "P × (1 + r)ⁿ", desc: "One-time investment, long horizon." },
  { name: "Income tax", slug: "income-tax-calculator", formula: "slabs − rebate + cess", desc: "Old and new regime, side by side." },
  { name: "SWP", slug: "swp-calculator", formula: "corpus − withdrawals + returns", desc: "How long a corpus can fund your income." },
];

export function Calculators() {
  return (
    <section id="calculators" className="border-y border-line bg-paper-2/60">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-moss">Calculators</p>
            <h2 className="display mt-3 max-w-xl text-4xl font-semibold leading-[1.1] sm:text-5xl">
              Every number comes with its working.
            </h2>
          </div>
          <a href="https://fermor.in/calculators" className="shrink-0 text-[0.95rem] font-medium text-moss-dark underline decoration-moss/30 underline-offset-4 hover:decoration-moss">
            See all 30+ calculators →
          </a>
        </Reveal>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {calcs.map((c) => (
            <li key={c.slug} className="bg-paper">
              <a href={`https://fermor.in/calculators/${c.slug}`} className="group flex h-full flex-col p-6 transition-colors hover:bg-white">
                <div className="flex items-center justify-between">
                  <h3 className="display text-2xl font-semibold">{c.name}</h3>
                  <span aria-hidden className="text-ink-3 transition-transform group-hover:translate-x-1 group-hover:text-moss">→</span>
                </div>
                <p className="mt-2 text-[0.92rem] text-ink-2">{c.desc}</p>
                <p className="mt-auto pt-8 font-mono text-[0.72rem] leading-snug text-ink-3">{c.formula}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
