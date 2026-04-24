import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const label = section.querySelector('.about-label');
    const heading = section.querySelector('.about-heading');
    const body = section.querySelector('.about-body');
    const button = section.querySelector('.about-button');
    const image = section.querySelector('.about-image');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    tl.from(label, { opacity: 0, y: 40, duration: 0.6, ease: 'power3.out' })
      .from(heading, { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out' }, '-=0.4')
      .from(body, { opacity: 0, y: 40, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .from(button, { opacity: 0, y: 30, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .from(image, { opacity: 0, scale: 0.95, duration: 1.0, ease: 'power3.out' }, '-=0.8');

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-white section-padding"
    >
      <div className="content-max-width">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left column - text (5 cols on desktop) */}
          <div className="lg:col-span-5">
            <div className="about-label label-text mb-6">من نحن</div>
            <h2
              className="about-heading font-cairo font-bold text-charcoal leading-[1.15] mb-6"
              style={{ fontSize: 'clamp(2rem, 3vw, 3rem)' }}
            >
              شركة الهدف الراقي للمقاولات العامة
            </h2>
            <p className="about-body font-geist text-lg text-charcoal leading-relaxed max-w-[520px] mb-8">
              تأسست شركة الهدف الراقي للمقاولات العامة في عام 2024 لتكون واحدة من الشركات الواعدة في مجال المقاولات العامة بالمملكة العربية السعودية. تعمل الشركة على تنفيذ مشاريع متنوعة تشمل المباني السكنية والتجارية وأعمال الخرسانات والتشطيبات والسباكة والكهرباء، بالالتزام بأعلى معايير الجودة والدقة في التنفيذ.
            </p>
            <button className="about-button inline-flex items-center gap-2 bg-goldenrod text-[#1a1a1a] px-8 py-3.5 rounded-full font-geist font-medium text-sm hover:bg-[#c8941d] hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(218,165,32,0.3)] transition-all duration-300">
              تعرف علينا أكثر
            </button>
          </div>

          {/* Right column - image (7 cols on desktop) */}
          <div className="lg:col-span-7">
            <div className="about-image rounded-lg overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.12)]">
              <img
                src="/images/project_30.png"
                alt="مشروع من مشاريع الشركة"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
