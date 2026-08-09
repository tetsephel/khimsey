import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { ImpactStrip, WordOfDay } from "@/components/landing/impact-and-word";
import { TeachStrip } from "@/components/landing/teach-strip";
import { LandingFooter } from "@/components/landing/footer";

export default function Home() {
  return (
    <section className="screen" id="s-landing">
      <Hero />
      <HowItWorks />
      <ImpactStrip />
      <WordOfDay />
      <TeachStrip />
      <LandingFooter />
    </section>
  );
}
