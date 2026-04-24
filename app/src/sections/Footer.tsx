import { Link } from 'react-router';

export default function Footer() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-charcoal" style={{ padding: '80px 5vw 40px' }}>
      <div className="max-w-[1280px] mx-auto">
        {/* Top Row */}
        <div className="flex flex-col lg:flex-row justify-between gap-8 mb-12">
          <div>
            <h3 className="font-cairo font-bold text-2xl text-goldenrod mb-1">
              الهدف الراقي
            </h3>
            <p className="font-geist text-sm text-[#999999]">
              Al Hadaf Al Raqi Contracting
            </p>
          </div>
          <nav className="flex flex-wrap items-center gap-6">
            <button
              onClick={() => scrollToSection('hero')}
              className="font-geist text-sm text-[#999999] hover:text-goldenrod transition-colors duration-300"
            >
              الرئيسية
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="font-geist text-sm text-[#999999] hover:text-goldenrod transition-colors duration-300"
            >
              من نحن
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="font-geist text-sm text-[#999999] hover:text-goldenrod transition-colors duration-300"
            >
              خدماتنا
            </button>
            <Link
              to="/projects"
              className="font-geist text-sm text-[#999999] hover:text-goldenrod transition-colors duration-300"
            >
              مشاريعنا
            </Link>
            <button
              onClick={() => scrollToSection('contact')}
              className="font-geist text-sm text-[#999999] hover:text-goldenrod transition-colors duration-300"
            >
              تواصل معنا
            </button>
          </nav>
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap items-center gap-4 mb-12 font-geist text-sm text-[#999999]">
          <span dir="ltr">+966 56 711 4014</span>
          <span className="text-[#555]">|</span>
          <span dir="ltr">+966 53 925 3445</span>
          <span className="text-[#555]">|</span>
          <span dir="ltr">info@elegantgoal.com</span>
          <span className="text-[#555]">|</span>
          <span>الخبر، المنطقة الشرقية، المملكة العربية السعودية</span>
        </div>

        {/* Bottom Row */}
        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6"
          style={{ borderTop: '1px solid #555' }}
        >
          <p className="font-geist text-xs text-[#666]">
            جميع الحقوق محفوظة © 2025
          </p>

        </div>
      </div>
    </footer>
  );
}
