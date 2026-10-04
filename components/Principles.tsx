import { Reveal } from "./Reveal";

const items = [
  { n: "01", t: "Show the working", d: "Every calculator lists its formula and each assumption. No black boxes, nothing you can't check." },
  { n: "02", t: "Independent by design", d: "We don't sell funds, FDs or insurance, and we don't earn commission on what you see. No nudges, no dark patterns." },
  { n: "03", t: "Private by default", d: "Calculations run in your browser. Your inputs stay on your device unless you choose to save a result." },
];

export function Principles() {
  return (
    <section className="bg-moss-dark text-paper">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-sun">What we stand for</p>
          <h2 className="display mt-3 max-w-2xl text-4xl font-semibold leading-[1.1] sm:text-5xl">
            Finance is easier to trust when you can see how it works.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {items.map((x, k) => (
            <Reveal key={x.n} delay={k * 90}>
              <div className="border-t border-paper/25 pt-5">
                <p className="tnum text-[0.8rem] text-sun">{x.n}</p>
                <h3 className="display mt-3 text-2xl font-semibold">{x.t}</h3>
                <p className="mt-3 leading-relaxed text-paper/75">{x.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
