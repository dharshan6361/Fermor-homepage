import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/fraunces";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fermor — Understand. Act. Grow.",
  description:
    "Fermor brings your investments, spending and goals into one clear picture, with calculators that show their working. Built for India.",
  openGraph: {
    title: "Fermor — Understand. Act. Grow.",
    description:
      "One clear picture of your money, and the maths behind every decision.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
