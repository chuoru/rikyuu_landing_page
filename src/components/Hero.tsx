'use client';

import { useEffect, useRef } from 'react';
import { useLang } from '@/contexts/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LINE_COUNT = 30;
const BASE_SPACING = 3.2;
const FACTOR = 1.09;

function buildLinePositions(): number[] {
  const positions: number[] = [];
  let y = 0;
  for (let i = 0; i < LINE_COUNT; i++) {
    y += BASE_SPACING * Math.pow(FACTOR, i);
    positions.push(y);
  }
  const total = y;
  return positions.map(p => (p / total) * 100);
}

const LINE_POSITIONS = buildLinePositions();

const slogans = {
  ja: ['本質から、', '未来を', 'つくる。'],
  en: ['Crafting the', 'Future from', 'What Matters.'],
};

export default function Hero() {
  const { lang } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const circleRef  = useRef<SVGCircleElement>(null);
  const linesRef   = useRef<HTMLDivElement>(null);
  const linesRef2  = useRef<HTMLDivElement>(null);
  const wordsRef   = useRef<HTMLDivElement>(null);
  const metaRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines  = linesRef.current  ? Array.from(linesRef.current.children)  : [];
      const lines2 = linesRef2.current ? Array.from(linesRef2.current.children) : [];
      const words  = wordsRef.current  ? Array.from(wordsRef.current.children)  : [];

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        circleRef.current,
        { scale: 0.4, opacity: 0, transformOrigin: '50% 50%' },
        { scale: 1, opacity: 1, duration: 1.8 }
      )
        .fromTo(
          [...lines, ...lines2],
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.9, stagger: { each: 0.012, from: 'end' } },
          '-=1.4'
        )
        .fromTo(
          words,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.12 },
          '-=0.6'
        )
        .fromTo(
          metaRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.4'
        );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(circleRef.current, { y: `${p * -25}%` });
          gsap.set([...lines, ...lines2], { opacity: 1 - p * 0.85 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const lines = slogans[lang];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center bg-green-deep overflow-hidden"
    >
      {/* Scan lines — top half, denser near bottom */}
      <div ref={linesRef} className="absolute inset-0 pointer-events-none" aria-hidden>
        {LINE_POSITIONS.map((pct, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px bg-cream/[0.05]"
            style={{ top: `${pct}%` }}
          />
        ))}
      </div>

      {/* Second set offset for more density */}
      <div ref={linesRef2} className="absolute inset-0 pointer-events-none" aria-hidden>
        {LINE_POSITIONS.map((pct, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px bg-gold/[0.04]"
            style={{ top: `${(pct + 1.6) % 100}%` }}
          />
        ))}
      </div>

      {/* Gradient circle */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 100 100"
      >
        <defs>
          <radialGradient id="heroGradDark" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#B8962E" stopOpacity="0.14" />
            <stop offset="45%"  stopColor="#B8962E" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#B8962E" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle ref={circleRef} cx="50" cy="50" r="50" fill="url(#heroGradDark)" />
      </svg>

      {/* Content */}
      <div className="relative flex flex-col items-start px-8 md:px-16 lg:px-24 w-full max-w-7xl mx-auto">

        {/* Big slogan */}
        <div ref={wordsRef} className="mb-10 md:mb-14">
          {lines.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <p
                className={`
                  font-light text-cream leading-[1.05] tracking-tight
                  text-[13vw] md:text-[10vw] lg:text-[8.5vw]
                  ${i === lines.length - 1 ? 'text-gold' : ''}
                `}
              >
                {line}
              </p>
            </div>
          ))}
        </div>

        {/* Meta row */}
        <div ref={metaRef} className="flex items-center gap-8 opacity-0">
          <div className="w-12 h-px bg-gold/60" />
          <span className="text-cream/30 text-[10px] tracking-[0.45em] uppercase font-mono">
            Rikyu Robotics
          </span>
          <a
            href="#philosophy"
            className="ml-auto text-gold/80 text-[10px] tracking-[0.35em] uppercase font-mono border-b border-gold/30 pb-0.5 hover:text-gold hover:border-gold transition-colors duration-200"
          >
            {lang === 'ja' ? '理念を読む →' : 'Our Philosophy →'}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 flex flex-col items-center gap-3 animate-scroll-bounce">
        <span className="text-cream/20 text-xs tracking-[0.4em]">SCROLL</span>
        <svg className="w-3.5 h-3.5 text-cream/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
