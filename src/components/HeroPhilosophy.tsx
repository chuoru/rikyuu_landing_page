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

const copy = {
  ja: {
    slogan: ['本質から、', '未来を', 'つくる。'],
    meta: 'Rikyu Robotics',
    quote: '利休ロボティックスとは、<span style="color:#B8962E;">本質的な価値創造</span>を追求する企業である。<span style="color:#B8962E;">既成概念にとらわれず</span>体験を再設計し、新たな価値を生み出す。<span style="color:#B8962E;">人と技術が向き合う本質的な時間と空間</span>を創出する。常に<span style="color:#B8962E;">一歩先の視点</span>で、社会に新しい価値を提供し続ける。',
  },
  en: {
    slogan: ['Crafting the', 'Future from', 'What Matters.'],
    meta: 'Rikyu Robotics',
    quote: '"Find beauty\nin imperfection.\nDiscover meaning\nin simplicity."',
  },
};

export default function HeroPhilosophy() {
  const { lang } = useLang();
  const sectionRef   = useRef<HTMLElement>(null);
  const bgOverlayRef = useRef<HTMLDivElement>(null);
  const linesRef     = useRef<HTMLDivElement>(null);
  const circleRef    = useRef<SVGCircleElement>(null);
  const heroPanelRef = useRef<HTMLDivElement>(null);
  const philoPanelRef= useRef<HTMLDivElement>(null);
  const scrollRef    = useRef<HTMLDivElement>(null);
  const metaRef      = useRef<HTMLDivElement>(null);
  const visualRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines      = linesRef.current ? Array.from(linesRef.current.children) : [];
      const philoItems = gsap.utils.toArray<Element>('[data-philo]');

      // Pinned scroll — 200 vh of scrub distance
      const pin = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          start: 'top top',
          end: '+=200%',
          scrub: true,
        },
      });

      // 0 – 0.15: scroll indicator fades
      pin.to(scrollRef.current, { opacity: 0, duration: 0.15 }, 0);

      // 0.2 – 0.5: hero content + lines + circle exit
      pin
        .to(heroPanelRef.current, { opacity: 0, y: -50, duration: 0.35 }, 0.2)
        .to(metaRef.current,      { opacity: 0, duration: 0.25 }, 0.2)
        .to(lines, { opacity: 0, stagger: { each: 0.006, from: 'random' }, duration: 0.35 }, 0.22)
        .to(circleRef.current,    { opacity: 0, scale: 1.5, duration: 0.4 }, 0.2);

      // 0 – 0.65: cream overlay tracks scroll from the very first movement
      pin.to(bgOverlayRef.current, { opacity: 1, duration: 0.65 }, 0);

      // 0.2 – 0.7: philosophy lines stagger in as hero blurs out
      pin.fromTo(philoItems,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.12 },
        0.2);

      // Steam stroke tracks scroll: cream → dark as overlay builds
      if (visualRef.current) {
        const steamEls = Array.from(visualRef.current.querySelectorAll('[data-steam]'));
        pin.to(steamEls, { attr: { stroke: '#1A3A2A' }, duration: 0.65 }, 0);

        // Robot arm + hishaku fade in together with philosophy content
        const robotEl = visualRef.current.querySelector('[data-robot]');
        if (robotEl) {
          pin.fromTo(robotEl,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
            0.3);
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  const t = copy[lang];

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      data-nav-theme="dark"
      className="relative h-screen bg-green-deep overflow-hidden"
    >
      {/* Cream overlay — animated from opacity 0 → 1 */}
      <div
        ref={bgOverlayRef}
        className="absolute inset-0 bg-cream pointer-events-none"
        style={{ opacity: 0 }}
      />

      {/* Scan lines */}
      <div ref={linesRef} className="absolute inset-0 pointer-events-none" aria-hidden>
        {LINE_POSITIONS.map((pct, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px bg-cream/[0.05]"
            style={{ top: `${pct}%` }}
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
          <radialGradient id="hpCircleGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#B8962E" stopOpacity="0.14" />
            <stop offset="45%"  stopColor="#B8962E" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#B8962E" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle ref={circleRef} cx="50" cy="50" r="50" fill="url(#hpCircleGrad)" />
      </svg>

      {/* ── Hero panel ── */}
      <div
        ref={heroPanelRef}
        className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-10 md:mb-14">
            {t.slogan.map((line, i) => (
              <div key={i} className="overflow-hidden">
                <p
                  data-hero-word
                  className={`font-light leading-[1.05] tracking-tight text-[13vw] md:text-[10vw] lg:text-[8.5vw] ${
                    i === t.slogan.length - 1 ? 'text-gold' : 'text-cream'
                  }`}
                >
                  {line}
                </p>
              </div>
            ))}
          </div>

          <div ref={metaRef} className="flex items-center gap-8">
            <div className="w-12 h-px bg-gold/60" />
            <span className="text-cream/30 text-[10px] tracking-[0.45em] uppercase font-mono">
              {t.meta}
            </span>
          </div>
        </div>
      </div>

      {/* ── Philosophy panel ── */}
      <div
        ref={philoPanelRef}
        className="absolute inset-0 flex items-end pb-16 md:pb-20 px-8 md:px-16 lg:px-24 pointer-events-none"
      >
        <div className="w-full text-center">
          {t.quote.split('\n').map((line, i) => (
            <div key={i} className="overflow-hidden">
              <p
                data-philo
                className="font-light leading-[1.15] tracking-tight text-[4.5vw] md:text-[3vw] lg:text-[2.2vw] text-green-deep text-justify [text-align-last:justify]"
                dangerouslySetInnerHTML={{ __html: line }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Right visual: wabi-cha cup + robot arm ── */}
      <div
        ref={visualRef}
        className="absolute inset-y-0 right-0 hidden md:flex items-start justify-center pt-16 w-[45%] pointer-events-none"
      >
        <svg viewBox="-20 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm h-auto">

          {/* Steam wisps — above cup cx=70 */}
          <path data-steam d="M 53 218 Q 48 205 53 192 Q 58 179 53 166"
                stroke="#F5F0E8" strokeWidth="1.2" strokeLinecap="round"/>
          <path data-steam d="M 70 213 Q 65 200 70 187 Q 75 174 70 161"
                stroke="#F5F0E8" strokeWidth="1.2" strokeLinecap="round"/>
          <path data-steam d="M 87 218 Q 82 205 87 192 Q 92 179 87 166"
                stroke="#F5F0E8" strokeWidth="1.2" strokeLinecap="round"/>

          {/* Chawan — cx=70 */}
          <g data-cup>
            <ellipse cx="70" cy="231" rx="48" ry="11" fill="#0F2419" fillOpacity="0.75"/>
            <ellipse cx="70" cy="228" rx="52" ry="14" stroke="#B8962E" strokeWidth="1.5"/>
            <path d="M 18 228 Q 10 268 23 300 Q 37 325 70 331 Q 103 325 117 300 Q 130 268 122 228"
                  fill="#F5F0E8" fillOpacity="0.06" stroke="#B8962E" strokeWidth="1.5"/>
            <ellipse cx="70" cy="331" rx="37" ry="9" stroke="#B8962E" strokeWidth="1.2"/>
          </g>

          {/* Robot arm + hishaku — hidden until philosophy scroll */}
          <g data-robot style={{ opacity: 0 }}>
            {/* Mount plate */}
            <rect x="238" y="8" width="40" height="12" rx="3" stroke="#B8962E" strokeWidth="1.5" fill="none"/>
            <line x1="258" y1="20" x2="258" y2="28" stroke="#B8962E" strokeWidth="1.5"/>
            {/* Shoulder joint */}
            <circle cx="258" cy="36" r="8" stroke="#B8962E" strokeWidth="1.5" fill="none"/>
            {/* Upper arm — two parallel lines */}
            <line x1="261" y1="45" x2="241" y2="111" stroke="#B8962E" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="255" y1="43" x2="235" y2="109" stroke="#B8962E" strokeWidth="1.5" strokeLinecap="round"/>
            {/* Elbow joint */}
            <circle cx="236" cy="116" r="6.5" stroke="#B8962E" strokeWidth="1.5" fill="none"/>
            {/* Forearm — two parallel lines */}
            <line x1="234" y1="122" x2="208" y2="160" stroke="#B8962E" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="230" y1="120" x2="204" y2="157" stroke="#B8962E" strokeWidth="1.5" strokeLinecap="round"/>
            {/* Wrist joint */}
            <circle cx="202" cy="165" r="8" stroke="#B8962E" strokeWidth="1.5" fill="none"/>
            {/* Hishaku handle — parallel lines with end cap */}
            <line x1="257" y1="193" x2="128" y2="118" stroke="#B8962E" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="254" y1="199" x2="125" y2="124" stroke="#B8962E" strokeWidth="1.5" strokeLinecap="round"/>
            {/* Handle end cap */}
            <line x1="257" y1="193" x2="254" y2="199" stroke="#B8962E" strokeWidth="1.5" strokeLinecap="round"/>
            {/* Hishaku bowl (柄杓) — rx=42 (~80% cup), rotated 30° */}
            <g transform="rotate(30, 90, 100)">
              <ellipse cx="90" cy="86" rx="42" ry="14" stroke="#B8962E" strokeWidth="1.5" fill="none"/>
              <line x1="48" y1="86" x2="48" y2="114" stroke="#B8962E" strokeWidth="1.5"/>
              <line x1="132" y1="86" x2="132" y2="114" stroke="#B8962E" strokeWidth="1.5"/>
              <path d="M 132 114 A 42 14 0 0 1 48 114" stroke="#B8962E" strokeWidth="1.5" fill="none"/>
            </g>
          </g>

        </svg>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-cream/20 text-xs tracking-[0.4em]">SCROLL</span>
        <svg className="w-3.5 h-3.5 text-cream/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
