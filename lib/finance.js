/** Pure finance helpers. Kept separate from UI so they are easy to read and test. */

export function sipFutureValue(monthly, annualRatePct, years) {
  const n = Math.round(years * 12);
  const r = annualRatePct / 100 / 12;
  if (n <= 0) return { invested: 0, value: 0 };
  const invested = monthly * n;
  const value = r === 0 ? invested : monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  return { invested, value };
}

/** Year-by-year series for charting. */
export function sipSeries(monthly, annualRatePct, years) {
  const out = [];
  for (let y = 0; y <= years; y++) {
    out.push({ year: y, ...sipFutureValue(monthly, annualRatePct, y) });
  }
  return out;
}

export function emi(principal, annualRatePct, years) {
  const n = Math.round(years * 12);
  const r = annualRatePct / 100 / 12;
  if (n <= 0) return 0;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });
export const formatINR = (n) => "₹" + inr.format(Math.round(n));

/** Indian short form: ₹12.4 L, ₹1.6 Cr */
export function formatShort(n) {
  const a = Math.abs(n);
  if (a >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (a >= 1e5) return `₹${(n / 1e5).toFixed(2)} L`;
  return formatINR(n);
}
