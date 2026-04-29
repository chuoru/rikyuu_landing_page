'use client';

import { useLang } from '@/contexts/LanguageContext';

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer data-nav-bg="#1A3A2A" className="bg-green-deep py-12 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo text */}
          <div className="flex items-center gap-2">
            <span className="text-cream/80 tracking-[0.2em] text-sm">利休</span>
            <span className="text-gold/60 tracking-[0.4em] text-xs">ROBOTICS</span>
          </div>

          {/* Copyright */}
          <p className="text-cream/30 text-xs tracking-widest text-center">
            {lang === 'ja'
              ? '© 2025 株式会社利休 All rights reserved.'
              : '© 2025 Rikyu Co., Ltd. All rights reserved.'}
          </p>

          {/* Back to top */}
          <a
            href="#"
            className="text-cream/40 text-xs tracking-widest hover:text-gold transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 15l7-7 7 7" />
            </svg>
            {lang === 'ja' ? 'トップへ' : 'TOP'}
          </a>
        </div>

        {/* Bottom divider + nav */}
        <div className="mt-8 pt-8 border-t border-cream/10 flex flex-wrap justify-center gap-6 md:gap-10">
          {(lang === 'ja'
            ? ['理念', '事業', 'お問い合わせ']
            : ['Philosophy', 'Services', 'Contact']
          ).map((item, i) => {
            const hrefs = ['#philosophy', '#services', '#contact'];
            return (
              <a
                key={item}
                href={hrefs[i]}
                className="text-cream/30 text-xs tracking-widest hover:text-cream/60 transition-colors duration-200"
              >
                {item}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
