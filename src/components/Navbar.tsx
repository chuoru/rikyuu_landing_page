'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useLang } from '@/contexts/LanguageContext';

const navLinks = {
  ja: [
    { href: '#product', label: '製品' },
    { href: '#contact', label: 'お問い合わせ' },
  ],
  en: [
    { href: '#product', label: 'Product' },
    { href: '#contact', label: 'Contact' },
  ],
};

const GREEN_DEEP = [26, 58, 42] as const;
const CREAM      = [245, 240, 232] as const;

function lerpColor(a: readonly number[], b: readonly number[], t: number): string {
  const r = Math.round(a[0] + (b[0] - a[0]) * t);
  const g = Math.round(a[1] + (b[1] - a[1]) * t);
  const bv = Math.round(a[2] + (b[2] - a[2]) * t);
  return `rgb(${r},${g},${bv})`;
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function isDarkBg(rgb: string): boolean {
  const m = rgb.match(/\d+/g);
  if (!m) return true;
  const [r, g, b] = m.map(Number);
  return (r * 299 + g * 587 + b * 114) / 1000 < 140;
}

export default function Navbar() {
  const { lang, toggle } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [bgColor, setBgColor] = useState(`rgb(${GREEN_DEEP.join(',')})`);

  useEffect(() => {
    const update = () => {
      const vh     = window.innerHeight;
      const pinEnd = vh * 2;

      if (window.scrollY < pinEnd) {
        // 0.65 matches the cream overlay duration in the pin timeline
        const t = Math.min(1, (window.scrollY / pinEnd) / 0.65);
        setBgColor(lerpColor(GREEN_DEEP, CREAM, t));
        return;
      }

      // Past the pinned section — read data-nav-bg from visible sections
      const navH = 56;
      let color = `rgb(${GREEN_DEEP.join(',')})`;
      document
        .querySelectorAll<HTMLElement>('[data-nav-bg]')
        .forEach(el => {
          if (el.getBoundingClientRect().top <= navH) {
            const hex = el.dataset.navBg ?? '';
            if (hex) {
              const [r, g, b] = hexToRgb(hex);
              color = `rgb(${r},${g},${b})`;
            }
          }
        });
      setBgColor(color);
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  const dark = isDarkBg(bgColor);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b transition-[background-color,border-color] duration-100"
      style={{
        backgroundColor: bgColor,
        borderColor: dark ? 'rgba(245,240,232,0.10)' : 'rgba(26,58,42,0.10)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">

        {/* Logo + wordmark */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-full overflow-hidden">
            <Image src="/rikyuu_no_text.jpeg" alt="Rikyu Robotics" fill className="object-cover" />
          </div>
          <span
            className="tracking-[0.2em] text-sm font-medium transition-colors duration-100"
            style={{ color: dark ? '#F5F0E8' : '#1A3A2A' }}
          >
            利休
            <span className="font-sans text-gold tracking-[0.3em] text-xs ml-2 font-light">
              ROBOTICS
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks[lang].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm tracking-widest hover:text-gold transition-colors duration-100"
              style={{ color: dark ? 'rgba(245,240,232,0.70)' : 'rgba(26,58,42,0.60)' }}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={toggle}
            className="text-xs tracking-[0.3em] border border-gold/60 text-gold px-4 py-1.5 hover:bg-gold hover:text-cream hover:border-gold transition-all duration-200"
          >
            {lang === 'ja' ? 'EN' : 'JP'}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggle}
            className="text-xs tracking-widest border border-gold/60 text-gold px-3 py-1 hover:bg-gold hover:text-cream transition-all duration-200"
          >
            {lang === 'ja' ? 'EN' : 'JP'}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1 transition-colors duration-100"
            style={{ color: dark ? '#F5F0E8' : '#1A3A2A' }}
            aria-label="Menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ backgroundColor: bgColor }}
      >
        <div className="px-6 pb-5 flex flex-col gap-4 pt-2">
          {navLinks[lang].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-wider py-2 border-b hover:text-gold transition-colors duration-200"
              style={{
                color: dark ? 'rgba(245,240,232,0.80)' : 'rgba(26,58,42,0.80)',
                borderColor: dark ? 'rgba(245,240,232,0.10)' : 'rgba(26,58,42,0.10)',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
