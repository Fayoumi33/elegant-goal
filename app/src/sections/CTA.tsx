import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactForm from '@/components/ContactForm';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = section.querySelectorAll('.cta-animate');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    tl.from(elements, {
      opacity: 0,
      y: 60,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.12,
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-goldenrod section-padding"
    >
      <div className="content-max-width text-center">
        <h2
          className="cta-animate font-cairo font-bold text-[#1a1a1a] leading-[1.15]"
          style={{ fontSize: 'clamp(2rem, 3vw, 3rem)' }}
        >
          لنبدأ مشروعك القادم
        </h2>
        <p className="cta-animate font-geist text-lg text-[#1a1a1a] opacity-70 max-w-[600px] mx-auto mt-6 leading-relaxed">
          نحن هنا لتحويل رؤيتك إلى واقع. تواصل معنا اليوم للحصول على استشارة مجانية ومشورة لمشروعك.
        </p>

        {/* Contact info */}
        <div className="cta-animate flex flex-wrap flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-4 mt-10">
          <div className="flex items-center gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            <span className="font-geist text-lg text-[#1a1a1a]" dir="ltr">+966 56 711 4014</span>
          </div>
          <div className="flex items-center gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            <span className="font-geist text-lg text-[#1a1a1a]" dir="ltr">+966 53 925 3445</span>
          </div>
          <div className="flex items-center gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span className="font-geist text-lg text-[#1a1a1a]" dir="ltr">info@elegantgoal.com</span>
          </div>
          <div className="flex items-center gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="font-geist text-lg text-[#1a1a1a]">الخبر، المنطقة الشرقية</span>
          </div>
        </div>

        <div className="cta-animate mt-10">
          <button
            onClick={() => setFormOpen(true)}
            className="inline-flex items-center gap-2 bg-[#1a1a1a] text-goldenrod px-10 py-4 rounded-full font-geist font-bold text-base hover:bg-charcoal hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all duration-300"
          >
            اطلب عرض سعر
          </button>
        </div>

      <ContactForm open={formOpen} onOpenChange={setFormOpen} />
      </div>
    </section>
  );
}
