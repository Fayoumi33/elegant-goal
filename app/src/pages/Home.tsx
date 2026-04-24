import { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import Hero from '../sections/Hero';
import About from '../sections/About';
import VisionMission from '../sections/VisionMission';
import Services from '../sections/Services';
import Projects from '../sections/Projects';
import WorkPhilosophy from '../sections/WorkPhilosophy';
import CTA from '../sections/CTA';
import Footer from '../sections/Footer';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // heroHeight minus nav height (72px)
      const heroHeight = window.innerHeight - 72;
      setIsScrolled(window.scrollY > heroHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <Navigation isScrolled={isScrolled} />
      <Hero />
      <About />
      <VisionMission />
      <Services />
      <Projects />
      <WorkPhilosophy />
      <CTA />
      <Footer />
    </div>
  );
}
