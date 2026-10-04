"use client";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

const qa = [
  {
    q: "Where is my money going?",
    a: "Food took ₹12,480 this month, 26% of your spending and your largest named category. Shopping came to ₹8,320 and transport ₹6,900. The biggest bucket is ‘Others’ at ₹20,620, so it is worth tagging those transactions to see what is hiding in there.",
  },
  {
    q: "How can I save more?",
    a: "Start with what repeats. Your spending is down 12% on last month, which suggests the habit is already forming. Moving even a fixed ₹2,000 to a SIP on payday, before you spend, tends to work better than saving whatever is left over.",
  },
  {
    q: "How does SIP compounding work?",
    a: "Each month's return is added to your balance, and the next month's return is earned on the larger balance. Early on the effect looks small. Over fifteen years it does most of the lifting, which is why time in the market matters more than the exact amount you start with.",
  },
];

export function AskDemo() {
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(qa[0].a.length);
  const timer = useRef(null);

  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  function pick(n) {
    if (timer.current) clearInterval(timer.current);
    setI(n);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setShown(qa[n].a.length); return; }
    setShown(0);
    timer.current = setInterval(() => {
      setShown((s) => {
        if (s >= qa[n].a.length) { if (timer.current) clearInterval(timer.current); return s; }
        return s + 2;
      });
    }, 16);
  }

  const done = shown >= qa[i].a.length;

  return (
    <section id="ask" className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
      <Reveal>
        <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-moss">Ask</p>
        <h2 className="display mt-3 text-4xl font-semibold leading-[1.1] sm:text-5xl">
          Ask your money a question.
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-ink-2">
          Plain-language answers, grounded in your own numbers. Ask what changed, what a decision costs, or how something works, and get the reasoning along with the answer.
        </p>
        <p className="mt-4 text-[0.88rem] text-ink-3">
          Fermor explains and illustrates. It is not a SEBI-registered adviser and does not give personalised investment advice.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <div className="rounded-3xl bg-ink p-5 text-paper shadow-[0_40px_80px_-40px_rgba(15,34,25,0.6)] sm:p-7">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Sample questions">
            {qa.map((x, n) => (
              <button key={x.q} type="button" onClick={() => pick(n)} aria-pressed={i === n}
                className={`rounded-full border px-4 py-2 text-left text-[0.85rem] transition-colors ${i === n ? "border-sun bg-sun text-ink" : "border-paper/25 text-paper/80 hover:border-paper/60"}`}>
                {x.q}
              </button>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <p className="max-w-[85%] rounded-2xl rounded-br-md bg-moss px-4 py-3 text-[0.95rem]">{qa[i].q}</p>
          </div>
          <div className="mt-4 flex gap-3">
            <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-paper/10 text-[0.7rem] font-semibold text-sun">F</span>
            <p className="min-h-36 text-[0.97rem] leading-relaxed text-paper/90" aria-live="polite">
              {qa[i].a.slice(0, shown)}
              {!done && <span className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 animate-pulse bg-sun" />}
            </p>
          </div>
          <p className="mt-4 border-t border-paper/10 pt-3 text-[0.72rem] text-paper/50">Sample conversation. Figures are illustrative.</p>
        </div>
      </Reveal>
    </section>
  );
}
