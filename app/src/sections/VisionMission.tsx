import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VisionMission() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const blocks = section.querySelectorAll('.vm-block');
    const numerals = section.querySelectorAll('.vm-numeral');

    const triggers: ScrollTrigger[] = [];

    blocks.forEach((block) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: block,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      tl.from(block.querySelectorAll('.vm-animate'), {
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
      });

      if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
    });

    // Parallax for numerals
    numerals.forEach((numeral) => {
      const st = ScrollTrigger.create({
        trigger: numeral.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          gsap.set(numeral, { y: 40 * (1 - self.progress) });
        },
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, []);

  const missionPoints = [
    'الالتزام بالمعايير العالمية للجودة والسلامة',
    'إنجاز المشاريع في الوقت المحدد',
    'حلول مبتكرة تلبي احتياجات العملاء',
    'علاقات طويلة الأمد قائمة على الثقة',
  ];

  return (
    <section
      ref={sectionRef}
      className="section-padding"
      style={{
        background: 'linear-gradient(135deg, #f5f5f0 0%, rgba(218,165,32,0.06) 100%)',
      }}
    >
      <div className="content-max-width">
        <div className="flex flex-col gap-20">
          {/* Vision Block */}
          <div className="vm-block grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
            <div className="lg:col-span-7">
              <div className="vm-animate label-text mb-6">رؤيتنا</div>
              <h2
                className="vm-animate font-cairo font-bold text-charcoal leading-[1.15] mb-6"
                style={{ fontSize: 'clamp(2rem, 3vw, 3rem)' }}
              >
                شريك موثوق في مسيرة البناء والتعمير
              </h2>
              <p className="vm-animate font-geist text-lg text-[#666666] leading-relaxed">
                نطمح في شركة الهدف الراقي أن نكون شريكاً موثوقاً في تطوير البنية التحتية وتقديم حلول مبتكرة وخدمات متكاملة في قطاع المقاولات. نسعى لأن نصبح من الشركات الرائدة في مجال المقاولات العامة بالمملكة العربية السعودية، نتميز بالجودة العالية والالتزام بالمواصفات العالمية.
              </p>
            </div>
            <div className="lg:col-span-5 hidden lg:flex justify-end overflow-hidden">
              <span
                className="vm-numeral font-geist font-bold leading-none select-none"
                style={{
                  fontSize: '12rem',
                  color: 'rgba(218,165,32,0.15)',
                }}
              >
                01
              </span>
            </div>
          </div>

          {/* Mission Block */}
          <div className="vm-block grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
            <div className="lg:col-span-7">
              <div className="vm-animate label-text mb-6">رسالتنا</div>
              <h2
                className="vm-animate font-cairo font-bold text-charcoal leading-[1.15] mb-6"
                style={{ fontSize: 'clamp(2rem, 3vw, 3rem)' }}
              >
                جودة عالية من التصميم حتى التسليم
              </h2>
              <p className="vm-animate font-geist text-lg text-[#666666] leading-relaxed mb-8">
                نلتزم في شركة الهدف الراقي بتقديم خدمات مقاولات شاملة وعالية الجودة تشمل جميع مراحل التنفيذ من التصميم وحتى التسليم النهائي، مع التركيز على: الالتزام بالمعايير العالمية للجودة والسلامة، إنجاز المشاريع في الوقت المحدد وضمن الميزانية المتفق عليها، توفير حلول مبتكرة تساهم في تلبية احتياجات العملاء وتحقيق تطلعاتهم، وبناء علاقات طويلة الأمد قائمة على الثقة والمصداقية.
              </p>
              <ul className="space-y-4">
                {missionPoints.map((point, i) => (
                  <li key={i} className="vm-animate flex items-start gap-3">
                    <span className="w-2 h-2 bg-goldenrod rounded-sm mt-2.5 flex-shrink-0" />
                    <span className="font-geist text-base text-charcoal leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5 hidden lg:flex justify-end overflow-hidden">
              <span
                className="vm-numeral font-geist font-bold leading-none select-none"
                style={{
                  fontSize: '12rem',
                  color: 'rgba(218,165,32,0.15)',
                }}
              >
                02
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
