"use client";
import { useId, useMemo, useState } from "react";
import { formatINR, formatShort, sipFutureValue, sipSeries } from "@/lib/finance";

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
}) {
  const id = useId();
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-2.5 flex items-baseline justify-between">
        <label htmlFor={id} className="text-[0.85rem] text-ink-2">
          {label}
        </label>
        <output htmlFor={id} className="tnum text-[0.95rem] font-medium">
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        style={{ ["--fill" as string]: `${fill}%` }}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

function Chart({ data }: { data: ReturnType<typeof sipSeries> }) {
  const W = 480;
  const H = 190;
  const pad = { l: 4, r: 10, t: 12, b: 22 };
  const maxV = Math.max(...data.map((d) => d.value), 1);
  const x = (i: number) => pad.l + (i / (data.length - 1)) * (W - pad.l - pad.r);
  const y = (v: number) => pad.t + (1 - v / maxV) * (H - pad.t - pad.b);

  const line = (key: "value" | "invested") =>
    data.map((d, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(d[key]).toFixed(1)}`).join(" ");
  const area = `${line("value")} L${x(data.length - 1)},${H - pad.b} L${x(0)},${H - pad.b} Z`;
  const last = data[data.length - 1];
  const ticks = [0, Math.round((data.length - 1) / 2), data.length - 1];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img"
      aria-label={`Projected growth chart. Invested ${formatShort(last.invested)}, projected value ${formatShort(last.value)}.`}>
      <defs>
        <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#1d6b50" stopOpacity="0.28" />
          <stop offset="1" stopColor="#1d6b50" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1={pad.l} x2={W - pad.r} y1={H - pad.b} y2={H - pad.b} stroke="#d9d4c4" />
      <path d={area} fill="url(#g)" />
      <path d={line("invested")} fill="none" stroke="#6b7b72" strokeWidth="1.6" strokeDasharray="4 4" />
      <path d={line("value")} fill="none" stroke="#1d6b50" strokeWidth="2.4" strokeLinejoin="round" />
      <circle cx={x(data.length - 1)} cy={y(last.value)} r="4.5" fill="#f5f2ea" stroke="#1d6b50" strokeWidth="2.2" />
      {ticks.map((i) => (
        <text key={i} x={x(i)} y={H - 5} fontSize="11" fill="#6b7b72"
          textAnchor={i === 0 ? "start" : i === data.length - 1 ? "end" : "middle"}>
          {i === 0 ? "Today" : `${data[i].year}y`}
        </text>
      ))}
    </svg>
  );
}

export function SipCard() {
  const [monthly, setMonthly] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(15);
  const [showMath, setShowMath] = useState(false);

  const { invested, value } = useMemo(() => sipFutureValue(monthly, rate, years), [monthly, rate, years]);
  const series = useMemo(() => sipSeries(monthly, rate, years), [monthly, rate, years]);
  const gain = value - invested;
  const n = years * 12;
  const i = rate / 100 / 12;

  return (
    <div className="rounded-3xl border border-line bg-white/60 p-5 shadow-[0_30px_60px_-30px_rgba(15,34,25,0.25)] backdrop-blur sm:p-7">
      <div className="flex items-center justify-between">
        <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-ink-3">SIP forecast</p>
        <span className="rounded-full bg-mint px-2.5 py-1 text-[0.72rem] font-medium text-moss-dark">Live · try it</span>
      </div>

      <div className="mt-5">
        <p className="text-[0.85rem] text-ink-2">In {years} years you could have</p>
        <p className="display tnum mt-1 text-[2.6rem] font-semibold leading-none sm:text-5xl" aria-live="polite">
          {formatShort(value)}
        </p>
        <p className="tnum mt-2 text-[0.88rem] text-ink-2">
          from {formatINR(invested)} invested, a gain of{" "}
          <span className="font-medium text-moss">{formatShort(gain)}</span>
        </p>
      </div>

      <div className="mt-5 -mx-1">
        <Chart data={series} />
      </div>
      <div className="mt-1 flex gap-5 text-[0.75rem] text-ink-3">
        <span className="flex items-center gap-1.5"><i className="h-0.5 w-4 bg-moss" />Projected value</span>
        <span className="flex items-center gap-1.5"><i className="h-0 w-4 border-t-2 border-dashed border-ink-3" />Amount invested</span>
      </div>

      <div className="mt-6 grid gap-5">
        <Slider label="Monthly investment" value={monthly} min={500} max={100000} step={500} onChange={setMonthly} display={formatINR(monthly)} />
        <div className="grid gap-5 sm:grid-cols-2">
          <Slider label="Expected return (p.a.)" value={rate} min={6} max={18} step={0.5} onChange={setRate} display={`${rate}%`} />
          <Slider label="Time period" value={years} min={1} max={40} step={1} onChange={setYears} display={`${years} yrs`} />
        </div>
      </div>

      <button
        type="button"
        onClick={() => setShowMath((v) => !v)}
        aria-expanded={showMath}
        className="mt-6 flex w-full items-center justify-between border-t border-line pt-4 text-left text-[0.9rem] font-medium"
      >
        Show the maths
        <svg width="14" height="14" viewBox="0 0 14 14" className={`transition-transform ${showMath ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M2 5l5 5 5-5" />
        </svg>
      </button>
      {showMath && (
        <div className="mt-3 rounded-xl bg-paper-2 p-4 text-[0.82rem] leading-relaxed text-ink-2">
          <p className="font-mono text-[0.78rem] text-ink">FV = P × [((1 + i)ⁿ − 1) ÷ i] × (1 + i)</p>
          <p className="tnum mt-2">
            P = {formatINR(monthly)} · i = {rate}% ÷ 12 = {(i * 100).toFixed(3)}% · n = {n} months
          </p>
          <p className="mt-2">
            Assumes a constant return and contributions at the start of each month. Real markets move around; this is an illustration, not a promise.
          </p>
        </div>
      )}
    </div>
  );
}
