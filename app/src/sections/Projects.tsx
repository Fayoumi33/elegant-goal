import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projectImages = [
  { src: '/images/project_01.png', label: 'عزل الأساسات' },
  { src: '/images/project_05.png', label: 'تجهيز حديد التسليح' },
  { src: '/images/project_10.png', label: 'أعمال البناء' },
  { src: '/images/project_15.png', label: 'أعمال الخرسانة' },
  { src: '/images/project_20.png', label: 'صب القواعد' },
  { src: '/images/project_25.png', label: 'قوالب الخرسانة' },
  { src: '/images/project_30.png', label: 'هيكل المبنى' },
  { src: '/images/project_35.png', label: 'معالجة الخرسانة' },
  { src: '/images/project_38.png', label: 'أعمال البلوك' },
  { src: '/images/project_40.png', label: 'أعمال الحفر' },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const cards = track.querySelectorAll<HTMLElement>('.gallery-card');
    const triggers: ScrollTrigger[] = [];

    // Calculate scroll distance
    const totalWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollDistance = totalWidth - viewportWidth + window.innerHeight * 0.6;

    // Main horizontal scroll
    const trackTween = gsap.to(track, {
      x: -scrollDistance,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    if (trackTween.scrollTrigger) triggers.push(trackTween.scrollTrigger);

    // Per-card grayscale reveal
    cards.forEach((card) => {
      const img = card.querySelector('img');
      if (!img) return;

      const st1 = ScrollTrigger.create({
        trigger: card,
        containerAnimation: trackTween,
        start: 'left 100%',
        end: 'left 30%',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const gray = 100 - progress * 100;
          const brightness = 60 + progress * 40;
          gsap.set(img, { filter: `grayscale(${gray}%) brightness(${brightness}%)` });
        },
      });
      triggers.push(st1);

      const st2 = ScrollTrigger.create({
        trigger: card,
        containerAnimation: trackTween,
        start: 'right 70%',
        end: 'right 0%',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const gray = progress * 100;
          const brightness = 100 - progress * 40;
          gsap.set(img, { filter: `grayscale(${gray}%) brightness(${brightness}%)` });
        },
      });
      triggers.push(st2);
    });

    // Entrance animation for header
    const header = section.querySelectorAll('.projects-header-animate');
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
    headerTl.from(header, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.12,
    });
    if (headerTl.scrollTrigger) triggers.push(headerTl.scrollTrigger);

    return () => {
      triggers.forEach((st) => st.kill());
      trackTween.kill();
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative bg-charcoal"
      style={{ height: '500vh' }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 w-full h-screen overflow-hidden"
      >
        {/* Section Header */}
        <div className="absolute top-0 left-0 right-0 pt-16 px-[5vw]" style={{ zIndex: 5 }}>
          <div className="max-w-[1280px] mx-auto">
            <div className="projects-header-animate label-text mb-4">مشاريعنا</div>
            <h2
              className="projects-header-animate font-cairo font-bold text-white leading-[1.15] mb-4"
              style={{ fontSize: 'clamp(2rem, 3vw, 3rem)' }}
            >
              أبرز المشاريع المنفذة
            </h2>
            <p className="projects-header-animate font-geist text-base text-[#999999] max-w-[600px] mb-4">
              نفخر بتنفيذ مشاريع متنوعة بأعلى معايير الجودة
            </p>
            <Link
              to="/projects"
              className="projects-header-animate inline-flex items-center gap-2 text-goldenrod font-geist text-sm font-medium hover:underline"
            >
              عرض جميع المشاريع
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Gallery track */}
        <div
          className="absolute top-0 left-0 h-full flex items-center"
          style={{ paddingLeft: '60vw', paddingTop: '120px' }}
        >
          <div
            ref={trackRef}
            className="flex gap-[3vw] will-change-transform"
          >
            {projectImages.map((project, index) => (
              <div
                key={index}
                className="gallery-card flex-shrink-0 relative rounded-lg overflow-hidden"
                style={{
                  width: '30vw',
                  height: '70vh',
                  transform: `translateY(${index % 2 === 0 ? '-3vh' : '3vh'})`,
                }}
              >
                <img
                  src={project.src}
                  alt={project.label}
                  className="w-full h-full object-cover"
                  style={{ filter: 'grayscale(100%) brightness(60%)' }}
                  loading="lazy"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 p-6 pt-12"
                  style={{
                    background: 'linear-gradient(transparent 40%, rgba(0,0,0,0.6) 100%)',
                  }}
                >
                  <span className="font-geist text-sm font-medium text-white">
                    {project.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
