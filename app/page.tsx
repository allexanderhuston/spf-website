import WaveCanvas from '@/components/WaveCanvas';
import Cursor from '@/components/Cursor';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Venue from '@/components/Venue';
import Lineup from '@/components/Lineup';
import Tickets from '@/components/Tickets';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import SunBackground from '@/components/SunBackground';

export default function Home() {
  return (
    <>
      {/* Sun lives at z-index:0 — behind all sections (z-index:1) */}
      <SunBackground />
      <WaveCanvas />
      <Cursor />
      <Nav />
      <Hero />
      <Venue />
      <Lineup />
      <Tickets />
      <FAQ />
      <CTA />
      <Footer />
      <ScrollReveal />
    </>
  );
}
