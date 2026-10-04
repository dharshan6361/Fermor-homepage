import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Pillars } from "@/components/Pillars";
import { Calculators } from "@/components/Calculators";
import { AskDemo } from "@/components/AskDemo";
import { Principles } from "@/components/Principles";
import { Insights } from "@/components/Insights";
import { Faq } from "@/components/Faq";
import { Join } from "@/components/Join";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Pillars />
        <Calculators />
        <AskDemo />
        <Principles />
        <Insights />
        <Faq />
        <Join />
      </main>
      <Footer />
    </>
  );
}
