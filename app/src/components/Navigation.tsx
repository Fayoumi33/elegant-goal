import { useState } from 'react';
import { Link, useLocation } from 'react-router';

interface NavigationProps {
  isScrolled: boolean;
}

export default function Navigation({ isScrolled }: NavigationProps) {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    if (!isHome) return;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navBg = isScrolled
    ? 'bg-white/96 backdrop-blur-xl shadow-sm'
    : 'bg-transparent';

  const textColor = isScrolled ? 'text-charcoal' : 'text-[#1a1a1a]';
  const borderColor = isScrolled ? 'border-charcoal/20' : 'border-[#1a1a1a]/30';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] h-[72px] transition-all duration-400 ${navBg}`}
    >
      <div className="content-max-width h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span
            className={`font-cairo font-bold text-xl ${textColor} transition-colors duration-400`}
          >
            الهدف الراقي
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {isHome ? (
            <>
              <button
                onClick={() => scrollToSection('hero')}
                className={`font-geist text-sm font-medium ${textColor} hover:text-goldenrod transition-colors`}
              >
                الرئيسية
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className={`font-geist text-sm font-medium ${textColor} hover:text-goldenrod transition-colors`}
              >
                من نحن
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className={`font-geist text-sm font-medium ${textColor} hover:text-goldenrod transition-colors`}
              >
                خدماتنا
              </button>
              <Link
                to="/projects"
                className={`font-geist text-sm font-medium ${textColor} hover:text-goldenrod transition-colors`}
              >
                مشاريعنا
              </Link>
              <button
                onClick={() => scrollToSection('contact')}
                className={`font-geist text-sm font-medium ${textColor} hover:text-goldenrod transition-colors`}
              >
                تواصل معنا
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                className={`font-geist text-sm font-medium ${textColor} hover:text-goldenrod transition-colors`}
              >
                الرئيسية
              </Link>
              <Link
                to="/projects"
                className={`font-geist text-sm font-medium ${textColor} hover:text-goldenrod transition-colors`}
              >
                مشاريعنا
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden font-geist text-sm font-medium px-4 py-1.5 rounded-full border ${borderColor} ${textColor}`}
        >
          {menuOpen ? 'إغلاق' : 'القائمة'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-[72px] left-0 right-0 bg-white/98 backdrop-blur-xl border-t border-gray-100 shadow-lg">
          <nav className="flex flex-col p-6 gap-4">
            {isHome ? (
              <>
                <button
                  onClick={() => scrollToSection('hero')}
                  className="text-right font-geist text-base font-medium text-charcoal hover:text-goldenrod transition-colors"
                >
                  الرئيسية
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-right font-geist text-base font-medium text-charcoal hover:text-goldenrod transition-colors"
                >
                  من نحن
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-right font-geist text-base font-medium text-charcoal hover:text-goldenrod transition-colors"
                >
                  خدماتنا
                </button>
                <Link
                  to="/projects"
                  onClick={() => setMenuOpen(false)}
                  className="text-right font-geist text-base font-medium text-charcoal hover:text-goldenrod transition-colors"
                >
                  مشاريعنا
                </Link>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-right font-geist text-base font-medium text-charcoal hover:text-goldenrod transition-colors"
                >
                  تواصل معنا
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="text-right font-geist text-base font-medium text-charcoal hover:text-goldenrod transition-colors"
                >
                  الرئيسية
                </Link>
                <Link
                  to="/projects"
                  onClick={() => setMenuOpen(false)}
                  className="text-right font-geist text-base font-medium text-charcoal hover:text-goldenrod transition-colors"
                >
                  مشاريعنا
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
