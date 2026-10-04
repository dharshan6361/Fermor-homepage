import { Reveal } from "./Reveal";

const posts = [
  { tag: "Income tax", t: "Section 87A rebate: limits and marginal relief", d: "Who qualifies, where the rebate stops, and a worked marginal relief example.", href: "https://fermor.in/blogs/section-87a-rebate" },
  { tag: "Income tax", t: "TDS on rent under Section 194I", d: "Rates, the monthly threshold and a worked example for landlords and tenants.", href: "https://fermor.in/blogs/section-194i-tds-on-rent" },
  { tag: "Regulation", t: "UPI charges above ₹2,000, explained", d: "What the new merchant fee covers, who pays it, and what stays free.", href: "https://fermor.in/blogs/upi-charges-above-2000" },
];

export function Insights() {
  return (
    <section id="insights" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-moss">Insights</p>
          <h2 className="display mt-3 text-4xl font-semibold leading-[1.1] sm:text-5xl">News that touches your wallet.</h2>
        </div>
        <a href="https://fermor.in/blogs" className="shrink-0 text-[0.95rem] font-medium text-moss-dark underline decoration-moss/30 underline-offset-4 hover:decoration-moss">All articles →</a>
      </Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {posts.map((p, k) => (
          <Reveal key={p.t} delay={k * 90}>
            <a href={p.href} className="group flex h-full flex-col rounded-3xl border border-line bg-white/50 p-6 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-[0_20px_40px_-24px_rgba(15,34,25,0.3)]">
              <span className="w-fit rounded-full bg-mint px-3 py-1 text-[0.72rem] font-medium text-moss-dark">{p.tag}</span>
              <h3 className="display mt-5 text-2xl font-semibold leading-snug">{p.t}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">{p.d}</p>
              <span className="mt-auto pt-6 text-[0.88rem] font-medium text-moss">Read the guide <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span></span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
