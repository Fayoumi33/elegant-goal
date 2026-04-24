import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const philosophyPoints = [
  {
    title: 'التعاون والتكامل',
    desc: 'التعاون والتكامل بين جميع أفراد الفريق',
  },
  {
    title: 'تبادل الخبرات',
    desc: 'تبادل الخبرات والمعرفة لتحقيق أفضل النتائج',
  },
  {
    title: 'معايير السلامة',
    desc: 'الالتزام بمعايير السلامة والجودة في كل مرحلة',
  },
  {
    title: 'الإبداع والابتكار',
    desc: 'بناء بيئة عمل إيجابية تدعم الابتكار',
  },
];

export default function WorkPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const textElements = section.querySelectorAll('.philosophy-text-animate');
    const points = section.querySelectorAll('.philosophy-point');
    const images = section.querySelectorAll('.philosophy-image');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    tl.from(textElements, {
      opacity: 0,
      y: 60,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.12,
    });

    tl.from(points, {
      opacity: 0,
      y: 40,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.1,
    }, '-=0.4');

    tl.from(images, {
      opacity: 0,
      x: -30,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.2,
    }, '-=0.6');

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-white section-padding">
      <div className="content-max-width">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left column - text */}
          <div>
            <div className="philosophy-text-animate label-text mb-6">فلسفة العمل</div>
            <h2
              className="philosophy-text-animate font-cairo font-bold text-charcoal leading-[1.15] mb-6"
              style={{ fontSize: 'clamp(2rem, 3vw, 3rem)' }}
            >
              روح الفريق الواحد
            </h2>
            <p className="philosophy-text-animate font-geist text-lg text-charcoal leading-relaxed mb-10">
              في شركة الهدف الراقي للمقاولات العامة، نؤمن أن النجاح لا يتحقق إلا من خلال روح الفريق الواحد. يتكون فريقنا من مهندسين، وفنيين، وإداريين ذوي خبرة عالية في مجال المقاولات يعملون جنباً إلى جنب لضمان تنفيذ المشاريع بأعلى مستويات الجودة والكفاءة.
            </p>

            {/* Philosophy points grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {philosophyPoints.map((point, index) => (
                <div
                  key={index}
                  className="philosophy-point p-6 bg-light-warm rounded-r-lg"
                  style={{ borderRight: '3px solid #daa520' }}
                >
                  <h4 className="font-geist font-bold text-base text-charcoal mb-2">
                    {point.title}
                  </h4>
                  <p className="font-geist text-sm text-[#666666]">
                    {point.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - images */}
          <div className="flex flex-col gap-6">
            <div className="philosophy-image rounded-lg overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
              <img
                src="/images/project_20.png"
                alt="أعمال صب الخرسانة"
                className="w-full aspect-[16/10] object-cover"
                loading="lazy"
              />
            </div>
            <div className="philosophy-image rounded-lg overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
              <img
                src="/images/project_35.png"
                alt="معالجة الخرسانة"
                className="w-full aspect-[16/10] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
