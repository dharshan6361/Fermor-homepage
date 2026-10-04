"use client";
import { useState } from "react";
import { formatINR } from "@/lib/finance";
import { Reveal } from "./Reveal";

const tabs = [
  {
    id: "understand",
    label: "Understand",
    title: "One view of everything you own and spend",
    body: "Investments, spending and savings, side by side. See what changed this month and why, without stitching together statements from five apps.",
    points: ["Net worth across holdings", "Spending by category", "Month-on-month changes"],
  },
  {
    id: "act",
    label: "Act",
    title: "Start small, and keep it going",
    body: "Set up a monthly SIP in a minute. Pick an amount you won't miss and a date that lines up with payday. Change it whenever life does.",
    points: ["Stocks, mutual funds and ETFs", "Monthly SIPs on a date you choose", "No jargon at the point of decision"],
  },
  {
    id: "grow",
    label: "Grow",
    title: "Plan toward things that matter to you",
    body: "Turn a vague wish into a number and a date. Move one input and watch how much it changes the outcome.",
    points: ["Goal tracking with projections", "Scenario forecasting", "A simple financial health check"],
  },
] as const;

const spend = [
  { k: "Food", v: 12480, c: "bg-moss" },
  { k: "Shopping", v: 8320, c: "bg-sun" },
  { k: "Transport", v: 6900, c: "bg-clay" },
  { k: "Others", v: 20620, c: "bg-ink-3" },
];

function UnderstandPanel() {
  const total = spend.reduce((a, b) => a + b.v, 0);
  return (
    <div>
      <p className="text-[0.82rem] text-ink-3">Total spending · this month</p>
      <p className="display tnum mt-1 text-4xl font-semibold">{formatINR(total)}</p>
      <p className="mt-1 text-[0.85rem] text-moss">↓ 12% vs last month</p>
      <div className="mt-6 flex h-3 overflow-hidden rounded-full" role="img" aria-label="Spending split by category">
        {spend.map((s) => (
          <span key={s.k} className={s.c} style={{ width: `${(s.v / total) * 100}%` }} />
        ))}
      </div>
      <ul className="mt-5 divide-y divide-line">
        {spend.map((s) => (
          <li key={s.k} className="flex items-center justify-between py-3 text-[0.92rem]">
            <span className="flex items-center gap-2.5"><i className={`h-2.5 w-2.5 rounded-full ${s.c}`} />{s.k}</span>
            <span className="tnum text-ink-2">
              {formatINR(s.v)} <span className="ml-2 text-ink-3">{Math.round((s.v / total) * 100)}%</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ActPanel() {
  const [amt, setAmt] = useState(500);
  const [day, setDay] = useState(17);
  return (
    <div>
      <p className="text-[0.82rem] text-ink-3">Start a monthly SIP</p>
      <div className="mt-3 flex items-center justify-between rounded-2xl border border-line bg-paper p-4">
        <div>
          <p className="font-medium">HDFC Bank</p>
          <p className="text-[0.8rem] text-ink-3">HDFCBANK · NSE</p>
        </div>
        <div className="text-right">
          <p className="tnum font-medium">₹1,612.50</p>
          <p className="tnum text-[0.8rem] text-moss">+1.56%</p>
        </div>
      </div>
      <p className="mt-6 text-[0.85rem] text-ink-2">Investment amount</p>
      <div className="mt-2 flex items-center gap-3">
        <button type="button" aria-label="Decrease amount" onClick={() => setAmt((a) => Math.max(500, a - 500))}
          className="h-11 w-11 rounded-full border border-line text-xl hover:bg-paper-2">−</button>
        <p className="display tnum min-w-32 text-center text-4xl font-semibold" aria-live="polite">{formatINR(amt)}</p>
        <button type="button" aria-label="Increase amount" onClick={() => setAmt((a) => Math.min(100000, a + 500))}
          className="h-11 w-11 rounded-full border border-line text-xl hover:bg-paper-2">+</button>
      </div>
      <p className="mt-2 text-[0.8rem] text-ink-3">Start small. Build big.</p>
      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Debit date">
        {[5, 10, 17, 25].map((d) => (
          <button key={d} type="button" onClick={() => setDay(d)} aria-pressed={day === d}
            className={`rounded-full border px-4 py-2 text-[0.85rem] transition-colors ${day === d ? "border-moss-dark bg-moss-dark text-paper" : "border-line hover:bg-paper-2"}`}>
            {d}th
          </button>
        ))}
      </div>
      <p className="mt-5 rounded-xl bg-paper-2 px-4 py-3 text-[0.85rem] text-ink-2">
        {formatINR(amt)} will be invested on the {day}th of every month. You can pause or change it anytime.
      </p>
    </div>
  );
}

const goalSeed = [
  { k: "Emergency fund", target: 300000, saved: 210000, monthly: 15000 },
  { k: "Home down payment", target: 2500000, saved: 640000, monthly: 30000 },
  { k: "Trip to Japan", target: 250000, saved: 90000, monthly: 10000 },
];

function GrowPanel() {
  const [sel, setSel] = useState(0);
  const [bump, setBump] = useState(0);
  const g = goalSeed[sel];
  const monthly = g.monthly + bump;
  const months = Math.ceil((g.target - g.saved) / monthly);
  const yrs = Math.floor(months / 12);
  const rem = months % 12;
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Choose a goal">
        {goalSeed.map((x, i) => (
          <button key={x.k} type="button" onClick={() => { setSel(i); setBump(0); }} aria-pressed={sel === i}
            className={`rounded-full border px-4 py-2 text-[0.85rem] transition-colors ${sel === i ? "border-moss-dark bg-moss-dark text-paper" : "border-line hover:bg-paper-2"}`}>
            {x.k}
          </button>
        ))}
      </div>
      <div className="mt-6">
        <div className="flex items-baseline justify-between">
          <p className="tnum display text-3xl font-semibold">{formatINR(g.saved)}</p>
          <p className="tnum text-[0.85rem] text-ink-3">of {formatINR(g.target)}</p>
        </div>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-line" role="progressbar" aria-valuenow={Math.round((g.saved / g.target) * 100)} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full rounded-full bg-moss transition-all duration-500" style={{ width: `${(g.saved / g.target) * 100}%` }} />
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between rounded-2xl border border-line bg-paper p-4">
        <div>
          <p className="text-[0.8rem] text-ink-3">Monthly contribution</p>
          <p className="tnum font-medium">{formatINR(monthly)}</p>
        </div>
        <div className="flex gap-2">
          <button type="button" aria-label="Contribute less" onClick={() => setBump((b) => Math.max(-g.monthly + 1000, b - 1000))} className="h-10 w-10 rounded-full border border-line hover:bg-paper-2">−</button>
          <button type="button" aria-label="Contribute more" onClick={() => setBump((b) => b + 1000)} className="h-10 w-10 rounded-full border border-line hover:bg-paper-2">+</button>
        </div>
      </div>
      <p className="mt-5 text-[0.95rem]" aria-live="polite">
        At this pace you reach it in{" "}
        <strong className="font-semibold text-moss">
          {yrs > 0 ? `${yrs} yr ` : ""}{rem} mo
        </strong>
        .
      </p>
      <p className="mt-1 text-[0.78rem] text-ink-3">Simple projection. No returns assumed.</p>
    </div>
  );
}

export function Pillars() {
  const [active, setActive] = useState(0);
  const t = tabs[active];
  return (
    <section id="product" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-moss">How it works</p>
        <h2 className="display mt-3 max-w-2xl text-4xl font-semibold leading-[1.1] sm:text-5xl">
          Understand. Act. Grow.
        </h2>
        <p className="mt-4 max-w-xl text-lg text-ink-2">
          Three steps that repeat. Get clear on where you are, make a move, and watch it compound.
        </p>
      </Reveal>

      <Reveal className="mt-12">
        <div role="tablist" aria-label="Fermor pillars" className="flex gap-1 border-b border-line">
          {tabs.map((x, i) => (
            <button key={x.id} role="tab" id={`tab-${x.id}`} aria-selected={active === i} aria-controls={`panel-${x.id}`}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") setActive((active + 1) % 3);
                if (e.key === "ArrowLeft") setActive((active + 2) % 3);
              }}
              tabIndex={active === i ? 0 : -1}
              className={`relative -mb-px flex items-center gap-2 px-4 py-3.5 text-[0.95rem] font-medium transition-colors sm:px-6 ${active === i ? "text-ink" : "text-ink-3 hover:text-ink-2"}`}>
              <span className="tnum text-[0.75rem] text-ink-3">0{i + 1}</span>
              {x.label}
              {active === i && <span className="absolute inset-x-3 bottom-0 h-0.5 bg-moss" />}
            </button>
          ))}
        </div>

        <div role="tabpanel" id={`panel-${t.id}`} aria-labelledby={`tab-${t.id}`} className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="lg:py-4">
            <h3 className="display text-3xl font-semibold leading-tight">{t.title}</h3>
            <p className="mt-4 text-lg leading-relaxed text-ink-2">{t.body}</p>
            <ul className="mt-6 space-y-3">
              {t.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-ink-2">
                  <svg className="mt-1 shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#1d6b50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5l3.2 3L13 4.5" /></svg>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white/60 p-6 sm:p-8">
            {active === 0 && <UnderstandPanel />}
            {active === 1 && <ActPanel />}
            {active === 2 && <GrowPanel />}
            <p className="mt-6 border-t border-line pt-3 text-[0.72rem] text-ink-3">Sample data for illustration.</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
