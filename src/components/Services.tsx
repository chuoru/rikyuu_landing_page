'use client';

import { useLang } from '@/contexts/LanguageContext';
import FadeInSection from './FadeInSection';

const services = {
  ja: {
    label: '事業',
    sublabel: 'SERVICES',
    heading: '私たちが\n創る価値',
    items: [
      {
        title: 'インテリジェント\nロボティクス',
        subtitle: 'Intelligent Robotics',
        desc: '精密なタスクに対応するAI駆動のロボティクスシステムを開発・提供。製造業から医療・農業まで、あらゆる分野における自動化と知能化を実現します。',
        icon: 'robot',
        status: '準備中',
      },
      {
        title: '人間・ロボット\n協調システム',
        subtitle: 'Human–Robot Collaboration',
        desc: '人間とロボットが自然に協働できる環境を設計。安全性・直感性・効率性を兼ね備えたコラボレーションプラットフォームの構築を支援します。',
        icon: 'collab',
        status: '準備中',
      },
      {
        title: 'イノベーション\nコンサルティング',
        subtitle: 'Innovation Consulting',
        desc: '既存のビジネスモデルを根本から問い直し、技術を通じた本質的な価値創造を実現。利休の精神に基づく、次世代の経営変革を共に歩みます。',
        icon: 'consult',
        status: '準備中',
      },
    ],
  },
  en: {
    label: 'Services',
    sublabel: 'WHAT WE BUILD',
    heading: 'Value We\nCreate',
    items: [
      {
        title: 'Intelligent\nRobotics',
        subtitle: '知能ロボティクス',
        desc: 'AI-driven robotic systems engineered for precision. From manufacturing to healthcare and agriculture, we bring intelligent automation to industries that matter.',
        icon: 'robot',
        status: 'Coming Soon',
      },
      {
        title: 'Human–Robot\nCollaboration',
        subtitle: '人間・ロボット協調',
        desc: 'Designing environments where humans and robots work naturally side by side. Safe, intuitive, and efficient — collaboration platforms built for the future of work.',
        icon: 'collab',
        status: 'Coming Soon',
      },
      {
        title: 'Innovation\nConsulting',
        subtitle: 'イノベーション支援',
        desc: 'Challenging existing paradigms to uncover essential value through technology. Guided by the Rikyu spirit, we walk alongside organizations through transformative change.',
        icon: 'consult',
        status: 'Coming Soon',
      },
    ],
  },
};

function RobotIcon() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 48 48">
      <rect x="14" y="18" width="20" height="18" rx="3" />
      <circle cx="19" cy="25" r="2.5" />
      <circle cx="29" cy="25" r="2.5" />
      <line x1="24" y1="10" x2="24" y2="18" />
      <circle cx="24" cy="8" r="3" />
      <line x1="14" y1="27" x2="8" y2="27" />
      <line x1="34" y1="27" x2="40" y2="27" />
      <line x1="18" y1="36" x2="18" y2="42" />
      <line x1="30" y1="36" x2="30" y2="42" />
      <line x1="19" y1="31" x2="29" y2="31" />
    </svg>
  );
}

function CollabIcon() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 48 48">
      <circle cx="16" cy="16" r="6" />
      <circle cx="32" cy="16" r="6" />
      <path d="M4 38c0-6.627 5.373-12 12-12h4" />
      <path d="M44 38c0-6.627-5.373-12-12-12h-4" />
      <path d="M20 30c0-2.21 1.79-4 4-4s4 1.79 4 4" />
      <line x1="24" y1="30" x2="24" y2="38" />
    </svg>
  );
}

function ConsultIcon() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 48 48">
      <polygon points="24,6 28,18 42,18 31,26 35,38 24,30 13,38 17,26 6,18 20,18" />
    </svg>
  );
}

const icons: Record<string, React.FC> = {
  robot: RobotIcon,
  collab: CollabIcon,
  consult: ConsultIcon,
};

export default function Services() {
  const { lang } = useLang();
  const s = services[lang];

  return (
    <section
      id="services"
      className="py-28 md:py-36 bg-green-deep relative overflow-hidden"
    >
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(184,150,46,0.08)_0%,_transparent_60%)]" />

      <div className="max-w-6xl mx-auto px-6 md:px-10 relative">
        {/* Section label */}
        <FadeInSection>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-gold" />
            <span className="text-gold tracking-[0.4em] text-xs uppercase">
              {s.sublabel}
            </span>
          </div>
        </FadeInSection>

        {/* Heading */}
        <FadeInSection delay={80}>
          <h2 className="text-cream font-light leading-tight mb-16 md:mb-20 whitespace-pre-line text-4xl md:text-5xl tracking-widest">
            {s.heading}
          </h2>
        </FadeInSection>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {s.items.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <FadeInSection key={i} delay={i * 150}>
                <div className="group border border-cream/10 hover:border-gold/50 p-8 transition-all duration-400 hover:-translate-y-1 cursor-default h-full flex flex-col">
                  {/* Gold top bar */}
                  <div className="w-8 h-px bg-gold mb-8" />

                  {/* Icon */}
                  <div className="text-gold mb-6">
                    <Icon />
                  </div>

                  {/* Title */}
                  <h3 className="text-cream font-light leading-tight mb-1 whitespace-pre-line text-xl tracking-wider">
                    {item.title}
                  </h3>
                  <p className="text-cream/30 text-xs tracking-widest mb-5">
                    {item.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-cream/60 text-sm leading-loose flex-1">
                    {item.desc}
                  </p>

                  {/* Status badge */}
                  <div className="mt-8">
                    <span className="text-gold/60 text-xs tracking-[0.3em] border border-gold/20 px-3 py-1">
                      {item.status}
                    </span>
                  </div>
                </div>
              </FadeInSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
