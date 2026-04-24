import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../components/Navigation';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

// All 41 project images
const allProjects = Array.from({ length: 41 }, (_, i) => ({
  src: `/images/project_${String(i + 1).padStart(2, '0')}.png`,
  label: `مشروع ${i + 1}`,
}));

export default function ProjectsPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 72);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const header = page.querySelectorAll('.projects-page-header');
    const items = page.querySelectorAll('.gallery-grid-item');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: page.querySelector('.projects-gallery'),
        start: 'top 85%',
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

    tl.from(items, {
      opacity: 0,
      y: 40,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.05,
    }, '-=0.4');

    return () => {
      tl.kill();
    };
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!lightboxOpen) return;
    if (e.key === 'Escape') setLightboxOpen(false);
    if (e.key === 'ArrowLeft') {
      setCurrentImage((prev) => (prev > 0 ? prev - 1 : allProjects.length - 1));
    }
    if (e.key === 'ArrowRight') {
      setCurrentImage((prev) => (prev < allProjects.length - 1 ? prev + 1 : 0));
    }
  }, [lightboxOpen]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const goNext = () => {
    setCurrentImage((prev) => (prev < allProjects.length - 1 ? prev + 1 : 0));
  };

  const goPrev = () => {
    setCurrentImage((prev) => (prev > 0 ? prev - 1 : allProjects.length - 1));
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-white">
      <Navigation isScrolled={isScrolled} />

      {/* Page Header */}
      <div className="bg-charcoal pt-[72px]">
        <div className="content-max-width py-16 md:py-24">
          <div className="projects-page-header label-text mb-6">معرض الأعمال</div>
          <h2
            className="projects-page-header font-cairo font-bold text-white leading-[1.15] mb-6"
            style={{ fontSize: 'clamp(2rem, 3vw, 3rem)' }}
          >
            صور من أعمالنا
          </h2>
          <p className="projects-page-header font-geist text-lg text-[#999999] max-w-[700px] leading-relaxed">
            تصفح مجموعة من صور مشاريعنا التي تعكس جودة عملنا واهتمامنا بالتفاصيل في كل مرحلة من مراحل التنفيذ.
          </p>
          <Link
            to="/"
            className="projects-page-header inline-flex items-center gap-2 text-goldenrod font-geist text-sm font-medium hover:underline mt-6"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
            العودة للرئيسية
          </Link>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="projects-gallery content-max-width py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProjects.map((project, index) => (
            <div
              key={index}
              className="gallery-grid-item group cursor-pointer rounded-lg overflow-hidden"
              onClick={() => openLightbox(index)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.src}
                  alt={project.label}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-600"
                  loading="lazy"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 p-4 pt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
                  }}
                >
                  <span className="font-geist text-sm font-medium text-white">
                    {project.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.92)' }}
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 text-white hover:text-goldenrod transition-colors z-10"
            onClick={closeLightbox}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Previous */}
          <button
            className="absolute left-4 md:left-8 text-white hover:text-goldenrod transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Image */}
          <img
            src={allProjects[currentImage].src}
            alt={allProjects[currentImage].label}
            className="max-w-[90vw] max-h-[90vh] object-contain animate-in fade-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          <button
            className="absolute right-4 md:right-8 text-white hover:text-goldenrod transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-geist text-sm text-white opacity-70">
            {currentImage + 1} / {allProjects.length}
          </div>
        </div>
      )}
    </div>
  );
}
