'use client';

import { useLang } from '@/contexts/LanguageContext';
import FadeInSection from './FadeInSection';

const content = {
  ja: {
    label: '理念',
    sublabel: 'PHILOSOPHY',
    paragraphs: [
      '千利休は、戦国という激動の時代において、茶の湯を単なる嗜好から精神文化へと昇華させた革新者である。豪華さや権威を競う従来の様式に対し、あえて質素・静寂・不完全の美を重んじる「わび茶」を確立し、人と人が向き合う本質的な時間と空間を創出した。',
      'その発想の根底には、既成概念にとらわれず、物事の本質を見極める鋭い洞察力と、新たな価値を生み出す豊かな想像力があった。利休は、限られた空間や道具の中に無限の意味を見出し、体験そのものを再設計することで、時代に新しい基準を提示したのである。',
      'この精神は、現代の経営においても極めて重要であり、表面的な競争ではなく、本質的な価値創造へと視座を高める示唆に富む。株式会社利休は、この革新の精神を指針とし、常に時代の一歩先を見据え、新しい価値観と体験を創造し続けることで、社会に持続的な豊かさと意義を提供していく存在になればと思います。',
    ],
    quote: '利休ロボティックスとは、千利休の精神に着想を得て、本質的な価値創造を追求する企業である。戦国時代に「わび茶」を確立した利休のように、既成概念にとらわれず、体験そのものを再設計する発想を重視する。限られた環境の中に新たな意味と価値を見出し、人と技術が向き合う本質的な時間と空間を創出する。常に時代の一歩先を見据え、持続的な豊かさと新しい価値観を社会に提供し続けることを目指す。',
  },
  en: {
    label: 'Philosophy',
    sublabel: 'OUR FOUNDATION',
    paragraphs: [
      'Sen no Rikyu was a visionary who, in the turbulent Sengoku era, elevated the tea ceremony from mere preference to a form of spiritual culture. Against the prevailing custom of competing in grandeur and authority, he deliberately embraced the beauty of simplicity, stillness, and imperfection — establishing wabi-cha and creating spaces of genuine human encounter.',
      'At the heart of his philosophy was a keen insight to perceive the essence of things without being bound by convention, and a rich imagination to generate new value. Rikyu found infinite meaning within limited spaces and tools, and by redesigning the experience itself, he set a new standard for his age.',
      'This spirit holds profound relevance in modern enterprise — guiding us to rise above surface competition toward the creation of essential value. Rikyu Co., Ltd. takes this pioneering spirit as its compass, always looking one step ahead, continuously creating new values and experiences to bring lasting richness and meaning to society.',
    ],
    quote: '"Find beauty in imperfection. Discover meaning in simplicity."',
  },
};

export default function Philosophy() {
  const { lang } = useLang();
  const c = content[lang];

  return (
    <section
      id="philosophy"
      className="py-28 md:py-36 bg-cream relative overflow-hidden"
    >
      {/* Decorative background character */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-green-deep/[0.03] leading-none select-none pointer-events-none"
        style={{ fontSize: 'clamp(200px, 30vw, 400px)' }}>
        道
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Section label */}
        <FadeInSection>
          <div className="flex items-center gap-4 mb-16">
            <div className="w-8 h-px bg-gold" />
            <span className="text-gold tracking-[0.4em] text-xs uppercase">
              {c.sublabel}
            </span>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-start">
          {/* Left: heading */}
          <FadeInSection>
            <div className="md:sticky md:top-32">
              <h2 className="text-green-deep font-light leading-tight text-4xl md:text-5xl tracking-widest">
                {c.label}
              </h2>
              <div className="mt-6 w-8 h-px bg-gold" />
              <p className="mt-6 text-green-deep/50 text-sm leading-loose italic">
                {c.quote}
              </p>
            </div>
          </FadeInSection>

          {/* Right: paragraphs */}
          <div className="flex flex-col gap-8">
            {c.paragraphs.map((para, i) => (
              <FadeInSection key={i} delay={i * 120}>
                <p className="text-green-deep/80 leading-[2] text-base md:text-[17px]">
                  {para}
                </p>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
