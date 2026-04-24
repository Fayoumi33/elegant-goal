import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const leftCurtain = leftCurtainRef.current;
    const rightCurtain = rightCurtainRef.current;
    const tagline = taglineRef.current;
    const headline = headlineRef.current;
    const subtitle = subtitleRef.current;
    const stats = statsRef.current;
    const scrollIndicator = scrollIndicatorRef.current;
    const circle = circleRef.current;

    if (!leftCurtain || !rightCurtain || !headline) return;

    const tl = gsap.timeline({ delay: 0.3 });

    // 1. Curtain slide
    tl.to(leftCurtain, {
      x: '-51vw',
      duration: 1.2,
      ease: 'power2.inOut',
    }, 0.4);

    tl.to(rightCurtain, {
      x: '51vw',
      duration: 1.2,
      ease: 'power2.inOut',
    }, 0.4);

    // 2. Headline reveal (whole text to preserve Arabic shaping)
    tl.from(headline, {
      opacity: 0,
      y: 60,
      duration: 1.0,
      ease: 'power3.out',
    }, '-=0.8');

    // 3. Tagline fade
    tl.from(tagline, {
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.4');

    // 4. Subtitle fade
    tl.from(subtitle, {
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.4');

    // 5. Stat items stagger
    const statItems = stats?.querySelectorAll('.stat-item');
    const statNumbers = stats?.querySelectorAll('.stat-number[data-target]');
    if (statItems && statItems.length > 0) {
      tl.from(statItems, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
      }, '-=1.0');
    }

    // 6. Counter animation
    if (statNumbers && statNumbers.length > 0) {
      statNumbers.forEach((el) => {
        const target = parseInt(el.getAttribute('data-target') || '0');
        tl.to(el, {
          textContent: target,
          duration: 1.5,
          ease: 'power2.out',
          snap: { textContent: 1 },
        }, '<+=0.15');
      });
    }

    // 7. Scroll indicator
    tl.from(scrollIndicator, {
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.5');

    // Curtain cleanup after animation
    tl.call(() => {
      leftCurtain.style.display = 'none';
      rightCurtain.style.display = 'none';
    });

    // Scroll indicator loop
    if (circle) {
      gsap.to(circle, {
        y: 48,
        duration: 1.6,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
      });
    }

    return () => {
      tl.kill();
      gsap.killTweensOf(circle);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full min-h-[600px] overflow-hidden"
      style={{ height: '100vh', background: '#daa520' }}
    >
      {/* Curtain panels */}
      <div
        ref={leftCurtainRef}
        className="absolute top-0 left-0 w-[50vw] h-full bg-goldenrod"
        style={{ zIndex: 50 }}
      />
      <div
        ref={rightCurtainRef}
        className="absolute top-0 right-0 w-[50vw] h-full bg-goldenrod"
        style={{ zIndex: 50 }}
      />

      {/* Hero content */}
      <div
        className="relative flex flex-col items-center justify-center w-full h-full px-[5vw] text-center"
        style={{ zIndex: 10 }}
      >
        <div
          ref={taglineRef}
          className="font-geist text-xs tracking-[0.15em] uppercase text-[#1a1a1a] opacity-70 mt-[15vh]"
        >
          شركة مقاولات عامة
        </div>

        <h1
          ref={headlineRef}
          className="font-cairo font-bold text-[#1a1a1a] text-center max-w-[900px] leading-[1.1] mt-6"
          style={{
            fontSize: 'clamp(3rem, 5vw, 5.5rem)',
            perspective: '1000px',
          }}
        >
          نبني بإتقان
        </h1>

        <p
          ref={subtitleRef}
          className="font-geist text-lg text-[#1a1a1a] opacity-70 text-center max-w-[600px] mt-6 leading-relaxed"
        >
          مقاولات عامة في الخبر والمنطقة الشرقية — من التأسيس حتى التسليم
        </p>

        {/* Stats section */}
        <div
          ref={statsRef}
          className="mt-[60px] pb-20"
          style={{ zIndex: 5 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-[1000px] mx-auto">
            <div className="stat-item flex flex-col items-center text-center">
              <span className="stat-number font-cairo text-4xl md:text-6xl font-bold text-[#1a1a1a]" data-target="2024">
                0
              </span>
              <span className="font-geist text-sm text-[#1a1a1a] opacity-70 tracking-wider mt-2">
                سنة التأسيس
              </span>
            </div>
            <div className="stat-item flex flex-col items-center text-center">
              <span className="stat-number font-cairo text-4xl md:text-6xl font-bold text-[#1a1a1a]" data-target="17">
                0
              </span>
              <span className="font-geist text-sm text-[#1a1a1a] opacity-70 tracking-wider mt-2">
                بنداً مقاولاتياً
              </span>
            </div>
            <div className="stat-item flex flex-col items-center text-center">
              <span className="stat-number font-cairo text-4xl md:text-6xl font-bold text-[#1a1a1a]" data-target="6">
                0
              </span>
              <span className="font-geist text-sm text-[#1a1a1a] opacity-70 tracking-wider mt-2">
                خدمات متخصصة
              </span>
            </div>
            <div className="stat-item flex flex-col items-center text-center">
              <span className="stat-number font-cairo text-4xl md:text-6xl font-bold text-[#1a1a1a]" data-target="2">
                0
              </span>
              <span className="font-geist text-sm text-[#1a1a1a] opacity-70 tracking-wider mt-2">
                مشاريع منفذة
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div
          ref={circleRef}
          className="w-3 h-3 border border-[#1a1a1a] rounded-full opacity-40"
        />
        <div className="w-px h-[60px] bg-[#1a1a1a] opacity-40" />
      </div>
    </section>
  );
}
