import { Header } from "@/components/Header";
import { RevealOnScroll } from "@/components/Reveal";
import {
  Areas,
  Difference,
  Emergency,
  EstimateBand,
  Faq,
  FinalCta,
  Footer,
  Guides,
  Hero,
  Process,
  Reviews,
  Services,
  StickyBar,
  TrustBar,
  WhyWave,
} from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <TrustBar />
        <Emergency />
        <Services />
        <Difference />
        <WhyWave />
        <Process />
        <Reviews />
        <EstimateBand />
        <Areas />
        <Guides />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyBar />
      <RevealOnScroll />
    </>
  );
}
