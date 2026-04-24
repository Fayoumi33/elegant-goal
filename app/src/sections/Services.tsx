import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20h20" />
        <path d="M6 20V10l6-6 6 6v10" />
        <path d="M14 20v-6h-4v6" />
        <path d="M10 4V2h4v2" />
      </svg>
    ),
    title: 'أعمال التأسيس والحفر والردم',
    desc: 'أعمال المسح والرفع المساحي، حفر القواعد والأساسات وفق المخططات الهندسية، أعمال الردم والدمك باستخدام المعدات الحديثة، تجهيز الأرضيات وصب الخرسانة العادية للأساسات',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4" />
      </svg>
    ),
    title: 'أعمال الخرسانات والهيكل الإنشائي',
    desc: 'تنفيذ القواعد والأساسات المسلحة، إنشاء الأعمدة والجسور والأسقف الخرسانية، تنفيذ الجدران الاستنادية والهياكل الإنشائية بجميع أنواعها',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M4 21V10l8-6 8 6v11" />
        <path d="M9 21v-6h6v6" />
        <path d="M10 9h4v3h-4z" />
      </svg>
    ),
    title: 'أعمال المباني',
    desc: 'بناء الجدران الداخلية والخارجية، تنفيذ الفواصل والعزل المائي والحراري، إنشاء المباني السكنية والتجارية والإدارية',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4" />
        <path d="M8 6h8l-1 12H9L8 6z" />
        <path d="M9 18v4" />
        <path d="M15 18v4" />
        <path d="M7 10h10" />
      </svg>
    ),
    title: 'أعمال التشطيبات الداخلية والخارجية',
    desc: 'اللياسة والدهانات الداخلية والخارجية، أعمال الأرضيات (سيراميك، رخام، جرانيت، بورسلان)، تركيب الأبواب والنوافذ والألمنيوم والزجاج',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        <path d="M19 9a3 3 0 010 6" />
      </svg>
    ),
    title: 'أعمال السباكة والكهرباء',
    desc: 'تمديد شبكات المياه والصرف الصحي، تركيب الأدوات الصحية بجودة عالية، أعمال التمديدات الكهربائية الداخلية والخارجية، تركيب لوحات التوزيع والإنارة',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 8h8" />
        <path d="M8 12h5" />
        <path d="M8 16h3" />
        <path d="M16 8v8" />
        <path d="M14 14l2 2 2-2" />
      </svg>
    ),
    title: 'إدارة المشاريع والإشراف الهندسي',
    desc: 'إدارة وتنظيم مراحل المشروع من البداية حتى التسليم، متابعة الجداول الزمنية وضبط التكاليف، الالتزام بمعايير الجودة والسلامة طوال فترة التنفيذ',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const header = section.querySelectorAll('.services-header-animate');
    const cards = section.querySelectorAll('.service-card');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    tl.from(header, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.12,
    });

    tl.from(cards, {
      opacity: 0,
      y: 60,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.1,
    }, '-=0.4');

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="bg-white section-padding"
    >
      <div className="content-max-width">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="services-header-animate label-text mb-6">خدماتنا</div>
          <h2
            className="services-header-animate font-cairo font-bold text-charcoal leading-[1.15] max-w-[700px] mx-auto"
            style={{ fontSize: 'clamp(2rem, 3vw, 3rem)' }}
          >
            نقدم حلولاً متكاملة في مجال المقاولات
          </h2>
          <p className="services-header-animate font-geist text-base text-[#666666] mt-4">
            منذ التأسيس وحتى تسليم المشروع جاهزاً للاستخدام
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card border border-[#e0e0e0] rounded-lg p-8 bg-white hover:border-goldenrod hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 group"
            >
              <div className="w-12 h-12 border border-goldenrod rounded-lg flex items-center justify-center text-goldenrod mb-6 group-hover:bg-goldenrod group-hover:text-white transition-all duration-300">
                {service.icon}
              </div>
              <h3 className="font-cairo font-bold text-xl text-charcoal mb-4">
                {service.title}
              </h3>
              <p className="font-geist text-[0.9375rem] text-[#666666] leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
