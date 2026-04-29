'use client';

import dynamic from 'next/dynamic';
import { useLang } from '@/contexts/LanguageContext';
import FadeInSection from './FadeInSection';

const SimViewer = dynamic(() => import('./SimViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-cream/5 animate-pulse" />
  ),
});

const content = {
  ja: {
    sublabel: '製品',
    name: 'スマートロボックス',
    subtitle: 'ロボットセルシステム',
    tagline: 'シミュレーション・ラボで生まれ、現場で動く。',
    capabilities: [
      {
        index: '01',
        title: 'かしこさ（インテリジェンス）',
        desc: '状況に合わせて動きを変え、自動で最適な作業を選びます',
      },
      {
        index: '02',
        title: '柔軟なデザイン',
        desc: '用途に応じて構成を変え、さまざまな作業に対応できます',
      },
      {
        index: '03',
        title: '拡張しやすさ',
        desc: '飲食店から製造ラインまで、規模に合わせて発展させられます',
      },
      {
        index: '04',
        title: '安全性',
        desc: '人と一緒に使えるように、安全に配慮した設計です',
      },
      {
        index: '05',
        title: 'すぐ使える',
        desc: '難しい設定なしで、すぐにシステムへ組み込めます',
      },
      {
        index: '06',
        title: 'フィジカルAIへ',
        desc: 'より賢く動くロボットのための基盤になります',
      },
    ],
    footnote: 'リアルタイム物理デモ',
  },
  en: {
    sublabel: 'PRODUCT',
    name: 'Starrobox',
    subtitle: 'Dual-Arm Robotic System',
    tagline: 'Born in the lab.\nBuilt for the real world.',
    capabilities: [
      {
        index: '01',
        title: 'Intelligence',
        desc: 'Adaptive control with real-time learning and task planning',
      },
      {
        index: '02',
        title: 'Flexibility by Design',
        desc: 'Modular architecture adapts to diverse manipulation tasks',
      },
      {
        index: '03',
        title: 'Scalability',
        desc: 'From single-arm research to full dual-arm production deployment',
      },
      {
        index: '04',
        title: 'Safety',
        desc: 'Force-limited joints and collision detection at every axis',
      },
      {
        index: '05',
        title: 'Plug and Play',
        desc: 'ROS2-native with zero-config hardware integration',
      },
      {
        index: '06',
        title: 'Toward Physical AI',
        desc: 'Foundation for embodied intelligence and autonomous manipulation',
      },
    ],
    footnote: 'MuJoCo WebAssembly — real-time physics in browser',
  },
};

export default function Product() {
  const { lang } = useLang();
  const t = content[lang];

  return (
    <section id="product" data-nav-bg="#1A3A2A" className="flex flex-col md:flex-row h-auto md:h-screen bg-green-deep">

      {/* Left — 30% capabilities panel */}
      <FadeInSection className="md:w-[30%] w-full flex flex-col justify-between px-8 py-16 md:px-10 md:py-20 border-b md:border-b-0 md:border-r border-cream/10">

        {/* Top: label + name */}
        <div>
          <span className="text-gold tracking-[0.35em] text-[10px] font-mono uppercase block mb-8">
            {t.sublabel}
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-cream tracking-wide mb-1">
            {t.name}
          </h2>
          <p className="text-cream/40 text-xs tracking-[0.25em] uppercase font-mono mb-8">
            {t.subtitle}
          </p>
          <div className="w-8 h-px bg-gold mb-8" />
          <p className="text-cream/70 text-sm leading-loose whitespace-pre-line font-light">
            {t.tagline}
          </p>
        </div>

        {/* Middle: capabilities list */}
        <div className="my-10 md:my-0 flex-1 flex flex-col justify-center">
          <div className="border-t border-cream/10">
            {t.capabilities.map((cap) => (
              <div
                key={cap.index}
                className="flex items-start gap-4 py-3.5 border-b border-cream/10 group"
              >
                <span className="text-gold/50 text-[9px] font-mono tracking-[0.15em] pt-0.5 flex-shrink-0">
                  {cap.index}
                </span>
                <div>
                  <p className="text-cream text-xs tracking-[0.12em] font-light mb-0.5">
                    {cap.title}
                  </p>
                  <p className="text-cream/35 text-[10px] leading-relaxed font-mono">
                    {cap.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: footnote */}
        <p className="text-cream/25 text-[9px] tracking-[0.2em] font-mono uppercase">
          {t.footnote}
        </p>

      </FadeInSection>

      {/* Right — 70% simulation viewer */}
      <div className="md:w-[70%] w-full aspect-video md:aspect-auto relative">
        <SimViewer className="absolute inset-0 w-full h-full" />
      </div>

    </section>
  );
}
