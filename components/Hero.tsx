import { SipCard } from "./SipCard";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-36">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full bg-mint/60 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-28">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 text-[0.82rem] font-medium text-moss-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-sun" />
            Built in Bengaluru, for Indian money
          </p>
          <h1 className="display text-[2.7rem] font-semibold leading-[1.04] sm:text-6xl lg:text-[4.4rem]">
            Know where your money stands.{" "}
            <span className="italic text-moss">Know what to do next.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
            Fermor brings your investments, spending and goals into one clear picture, then shows the maths behind every decision so you can check it yourself.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#join" className="rounded-full bg-moss-dark px-7 py-3.5 text-center font-medium text-paper transition-colors hover:bg-ink">
              Join the waitlist
            </a>
            <a href="#calculators" className="rounded-full border border-ink/20 px-7 py-3.5 text-center font-medium transition-colors hover:border-ink hover:bg-white/50">
              Try a free calculator
            </a>
          </div>
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-6">
            {[
              ["30+", "free calculators"],
              ["0", "commissions earned"],
              ["No", "sign-up needed"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="display text-3xl font-semibold">{n}</dt>
                <dd className="mt-1 text-[0.8rem] leading-snug text-ink-3">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <SipCard />
      </div>
    </section>
  );
}
