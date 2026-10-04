import { Reveal } from "./Reveal";

const faqs = [
  { q: "What does Fermor actually do?", a: "Fermor runs the maths behind everyday money decisions: calculators for loans, savings and tax, plus plain analysis of what the numbers mean, so you can compare options before committing to one." },
  { q: "Is this financial advice?", a: "No. Fermor is educational and is not a SEBI-registered adviser. The tools show you the arithmetic and the trade-offs. The decision, and any advice on it, stays with you and your adviser." },
  { q: "What happens to the numbers I enter?", a: "Calculations run in your browser. Your inputs stay on your device unless you choose to save a result to an account, and you can clear a saved calculation whenever you want." },
  { q: "How should I use the calculators?", a: "Start with the figures you already know, then change one input at a time. Seeing how sensitive an outcome is to a single change is often more useful than any one result." },
  { q: "Do I need an account?", a: "Not for the calculators. Everything is free to use, and an account only matters if you want results kept between visits." },
];

export function Faq() {
  return (
    <section id="faq" className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 sm:px-8 sm:pb-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <Reveal>
        <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-moss">Questions</p>
        <h2 className="display mt-3 text-4xl font-semibold leading-[1.1] sm:text-5xl">Good to know.</h2>
      </Reveal>
      <Reveal delay={80}>
        <div className="divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="relative h-4 w-4 shrink-0">
                  <i className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 bg-ink" />
                  <i className="absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 bg-ink transition-transform group-open:scale-y-0" />
                </span>
              </summary>
              <p className="mt-3 max-w-xl leading-relaxed text-ink-2">{f.a}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
